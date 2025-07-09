<?php

namespace App\Http\Resources\ProductType;

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
        return $this->collection->map(function ($item) {

            $product = $item->product;

            return [
                'id' => $product->id,
                'brand' => $product->brand->title,
                'title' => $product->title,
                'likes' => $product->likes->pluck('user_id'),
                'colors' => $product->product_types->pluck('color_code'),
                'type_id' => $item->id,
                'image' => $item->image,
                'count' => $item->count,
                'discount' => $item->discount,
                'price' => number_format($item->price),
                'payment' =>number_format( $item->payment),
            ];
        });
    }
}
