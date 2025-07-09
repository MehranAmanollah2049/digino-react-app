<?php

namespace App\Http\Resources\single_product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductTypeCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($item) use($request) {

            $user_cart = null;

            if($request->user())
            {
                if($cart = $request->user()->cart()->where('productType_id' , $item->id)->first())
                {
                    $user_cart = [
                        'id' => $cart->id,
                        'count' => $cart->count,
                    ];
                }
            }

            return [
                'id' => $item->id,
                'image' => $item->image,
                'color_code' => $item->color_code,
                'color_title' => $item->color_title,
                'count' => $item->count,
                'discount' => $item->discount,
                'price' => number_format($item->price),
                'payment' => number_format($item->payment),
                'cart_user' => $user_cart
            ];
        });
    }
}
