<?php

namespace App\Http\Resources\orders;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OrderCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($order) {

            return [
                'id' => $order->id,
                'code' => $order->code,
                'driver' => $order->driver,
                'status' => $order->status,
                'total' => number_format($order->total_payment()),
                'created_at' => Carbon::parse($order->updated_at)->diffForHumans(),
                'products' => new OrderProductsCollection($order->products)
            ];

        });
    }
}
