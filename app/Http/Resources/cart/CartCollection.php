<?php

namespace App\Http\Resources\cart;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CartCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($cart) {

            $item = $cart->product_type;
            $product = $item->product;

            return [
                'id' => $cart->id,
                'product_id' => $product->id,
                'type_id' => $item->id,
                'count' => $cart->count,
                'total' => $item->count,
                'color_code' => $item->color_code,
                'color_title' => $item->color_title,
                'image' => $item->image,
                'discount' => $item->discount,
                'price' => $item->price,
                'payment' => $item->payment,
                'title' => $product->title,
            ];
        });
    }
}
