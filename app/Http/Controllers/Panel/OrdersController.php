<?php

namespace App\Http\Controllers\panel;

use App\Http\Controllers\Controller;
use App\Http\Resources\orders\detail\OrderResource;
use App\Http\Resources\orders\OrderCollection;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Services\Notifications\Sms\SmsService;
use Illuminate\Http\Request;
use Shetabit\Multipay\Invoice;
use Shetabit\Payment\Facade\Payment;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;

class OrdersController extends Controller
{
    public function get_orders(Request $request)
    {
        $orders = $request->user()->orders();

        if ($request->has('limit')) {
            $orders->limit($request->limit);
        }

        return response([
            'data' => new OrderCollection($orders->orderByDesc('created_at')->get())
        ]);
    }

    public function get_detail_order(Order $order, Request $request)
    {
        return new OrderResource($order);
    }

    public function increase_count(Order $order, OrderProduct $orderProduct)
    {

        if ($orderProduct->order_id != $order->id) {
            return response()->json([
                "error" => "امکان اجرای این عملیات وجود ندارد"
            ], 422);
        }

        $new_count = $orderProduct->count + 1;
        $productType = $orderProduct->product_type;

        if ($new_count > $productType->count) {
            return response()->json([
                "error" => "موجودی در انبار کافی نمی باشد"
            ], 422);
        }

        $orderProduct->update([
            'count' => $new_count
        ]);

        return response([
            'count' => $orderProduct->count
        ]);
    }

    public function decrease_count(Order $order, OrderProduct $orderProduct)
    {
        if ($orderProduct->order_id != $order->id) {
            return response()->json([
                "error" => "امکان اجرای این عملیات وجود ندارد"
            ], 422);
        }

        $new_count = $orderProduct->count - 1;

        if ($new_count <= 0) {

            $orderProduct->delete();

            if ($order->products->count() == 0) {
                $order->delete();

                return response()->json([
                    "is_deleted" => true,
                    'order_deleted' => true
                ]);
            }

            return response()->json([
                "is_deleted" => true,
                'order_deleted' => false
            ]);
        }

        $orderProduct->update([
            'count' => $new_count
        ]);

        return response([
            'count' => $orderProduct->count,
            "is_deleted" => false,
            'order_deleted' => false
        ]);
    }

    public function payment(Order $order, Request $request)
    {
        if (!$order->is_all_products_available()) {
            return response([
                'error' => 'لطفا موجودی کالا های خود را چک کنید'
            ], 422);
        }

        $amount = $order->total_payment();

        // payment
        $invoice = (new Invoice)->amount($amount);

        return Payment::callbackUrl(route('payment.panel.callback', ['amount' => $amount]))
            ->purchase($invoice, function ($driver, $transactionId) use ($order) {
                $order->update([
                    'transaction_id' => $transactionId,
                    'driver' => config('payment.driver_title'),
                ]);
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
                'status' => 'پرداخت شده',
            ]);

            foreach($order->products as $product) 
            {
                $type = $product->product_type;

                $type->update([
                    'count' => $type->count - $product->count
                ]);

                $product->update([
                    'discount' => $type->discount,
                    'price' => $type->price,
                    'payment' => $type->payment,
                ]);
            }
            
            $format_amout = number_format($request->amount);
            $smsService->send($user->phone, getNotificationPattern('payment-code'), ["$user->name","$format_amout","$order->code"]);

            return redirect(env('FRONT_URL') . "/orders/$order->id");
        } catch (InvalidPaymentException $exception) {
            return redirect(env('FRONT_URL') . "/orders/$order->id");
        }
    }
}
