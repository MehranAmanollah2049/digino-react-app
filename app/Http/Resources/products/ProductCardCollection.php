<?php

namespace App\Http\Resources\products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCardCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($item) {

            $detail = $item->product_types()->first();

            return [
                'id' => $item->id,
                'brand' => $item->brand->title,
                'title' => $item->title,
                'likes' => $item->likes->pluck('user_id'),
                'colors' => $item->product_types->pluck('color_code'),
                'type_id' => $detail->id,
                'type_color' => $detail->color_code,
                'image' => $detail->image,
                'count' => $detail->count,
                'discount' => $detail->discount,
                'price' => number_format($detail->price),
                'payment' =>number_format( $detail->payment),
            ];
        });
    }
}
