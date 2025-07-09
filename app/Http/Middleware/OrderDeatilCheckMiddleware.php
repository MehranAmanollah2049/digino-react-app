<?php

namespace App\Http\Middleware;

use App\Models\Order;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OrderDeatilCheckMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(is_string($request->order))
        {
            $order = Order::findOrFail($request->order);
        }
        else {
            $order = $request->order;
        }
       
        if ($request->user()->id != $order->user_id) {
            return response([
                'error' => 'امکان مشاهده این سفارش وجود ندارد'
            ], 422);
        }

        return $next($request);
    }
}
