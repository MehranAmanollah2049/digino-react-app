<?php

namespace App\Http\Resources\orders\detail;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OrderProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($item) {

            $order = $item->order;
            $type = $item->product_type;
            $product = $type->product;

            if ($order->status == 'پرداخت شده') {
                return [
                    'id' => $item->id,
                    'product_id' => $product->id,
                    'type_id' => $type->id,
                    'title' => $product->title,
                    'image' => $type->image,
                    'color_code' => $type->color_code,
                    'color_title' => $type->color_title,
                    'discount' => $item->discount,
                    'price' => $item->price,
                    'payment' => $item->payment,
                    'count' => $item->count,
                    'total' => -1
                ];
            }

            return [
                'id' => $item->id,
                'product_id' => $product->id,
                'type_id' => $type->id,
                'title' => $product->title,
                'image' => $type->image,
                'color_code' => $type->color_code,
                'color_title' => $type->color_title,
                'discount' => $type->discount,
                'price' => $type->price,
                'payment' => $type->payment,
                'total' => $type->count,
                'count' => $item->count,
            ];
        });
    }
}
