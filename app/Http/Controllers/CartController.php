<?php

namespace App\Http\Controllers;

use App\Http\Resources\cart\CartCollection;
use App\Models\Cart;
use App\Models\Order;
use App\Models\ProductType;
use App\Services\Notifications\Sms\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Shetabit\Multipay\Invoice;
use Shetabit\Payment\Facade\Payment;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;

class CartController extends Controller
{
    public function add_cart(ProductType $productType, Request $request)
    {
        if ($productType->count <= 0) {
            return response()->json([
                "error" => "موجودی در انبار کافی نمی باشد"
            ], 422);
        }

        if ($request->user()->cart()->where('productType_id', $productType->id)->first()) {
            return response()->json([
                "error" => "این محصول از قبل در سبد خرید شما وجود دارد"
            ], 422);
        }

        $cart = $request->user()->cart()->create([
            'productType_id' => $productType->id
        ]);

        return response([
            'data' => [
                'id' => $cart->id,
                'count' => 1
            ]
        ]);
    }

    public function increase_count(Cart $cart, Request $request)
    {
        $productType = $cart->product_type;

        if ($cart->productType_id != $productType->id) {
            return response()->json([
                "error" => "امکان اجرای این عملیات وجود ندارد"
            ], 422);
        }

        $new_count = $cart->count + 1;

        if ($new_count > $productType->count) {
            return response()->json([
                "error" => "موجودی در انبار کافی نمی باشد"
            ], 422);
        }

        $cart->update([
            'count' => $new_count
        ]);

        return response([
            'count' => $cart->count
        ]);
    }

    public function decrease_count(Cart $cart, Request $request)
    {
        $productType = $cart->product_type;
        
        if ($cart->productType_id != $productType->id) {
            return response()->json([
                "error" => "امکان اجرای این عملیات وجود ندارد"
            ], 422);
        }

        $new_count = $cart->count - 1;

        if ($new_count <= 0) {

            $cart->delete();

            return response()->json([
                "is_deleted" => true,
                "order_deleted" => false
            ]);
        }

        $cart->update([
            'count' => $new_count
        ]);

        return response([
            'count' => $cart->count,
            "is_deleted" => false,
            "order_deleted" => false
        ]);
    }

    public function get_cart(Request $request)
    {
        return response([
            'data' => new CartCollection($request->user()->cart)
        ]);
    }

    public function payment(Request $request)
    {
        $available_carts = $request->user()->available_cart();

        if ($available_carts->count() <= 0) {
            return response([
                'error' => 'امکان اجرای این عملیات وجود ندارد'
            ], 422);
        }

        $amount = $available_carts->sum(function ($cart) {
            return $cart->product_type->payment * $cart->count;
        });


        // payment
        $invoice = (new Invoice)->amount($amount);

        return Payment::callbackUrl(route('payment.callback', ['amount' => $amount]))
            ->purchase($invoice, function ($driver, $transactionId) use ($available_carts, $request) {
                // order
                $this->createFactor($available_carts, $transactionId, config('payment.driver_title'), $request->user());
                // products
                Cache::set("{$request->user()->id}-products-{$transactionId}", $available_carts->pluck('id'), now()->addMinutes(30));
            })->pay()->toJson();
    }

    public function verify(Request $request,SmsService $smsService)
    {
        $transaction_Id = $request[config('payment.responses')];

        $order = Order::where('transaction_id', $transaction_Id)->first();

        $user = $order->user;
        
        try {
            $receipt = Payment::amount(intval($request->amount))->transactionId($transaction_Id)->verify();

            // You can show payment referenceId to the user.
            $order->update([
                'code' => $receipt->getReferenceId(),
                'status' => 'پرداخت شده'
            ]);

            $ids = Cache::pull("{$user->id}-products-{$transaction_Id}");

            foreach ($ids as $id) {
                if ($cart = Cart::find($id)) {
                    $type = $cart->product_type;

                    $type->update([
                        'count' => $type->count - $cart->count
                    ]);

                    $cart->delete();
                }
            }

            $format_amout = number_format($request->amount);
            $smsService->send($user->phone, getNotificationPattern('payment-code'), ["$user->name","$format_amout","$order->code"]);

            return redirect(env('FRONT_URL') . "/orders/$order->id");
        } catch (InvalidPaymentException $exception) {
            return redirect(env('FRONT_URL') . "/orders/$order->id");
        }
    }

    public function order_status(Order $order, Request $request)
    {
        if ($request->user()->id != $order->user_id) {
            return response([
                'error' => 'امکان مشاهده این رسید وجود ندارد'
            ], 422);
        }

        return response([
            'code' => $order->code,
            'status' => $order->status,
        ]);
    }

    protected function createFactor($available_carts, $transactionId, $driver, $user)
    {
        $order = Order::create([
            'user_id' => $user->id,
            'full_name' => $user->name . ' ' . $user->lastname,
            'phone' => $user->phone,
            'code' => mt_rand(100000, 999999),
            'transaction_id' => $transactionId,
            'driver' => $driver,
        ]);

        foreach ($available_carts as $cart) {

            $type = $cart->product_type;

            $order->products()->create([
                'productType_id' => $type->id,
                'discount' => $type->discount,
                'price' => $type->price,
                'payment' => $type->payment,
                'count' => $cart->count
            ]);
        }
    }
}
