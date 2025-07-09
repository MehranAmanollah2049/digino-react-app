<?php

namespace App\Http\Resources\orders;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OrderProductsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($product) {

            $product_type = $product->product_type;
            $item = $product_type->product;

            return [
                'id' => $product->id,
                'title' => $item->title,
                'product_id' => $item->id,
                'productType_id' => $product->productType_id,
                'image' => $product_type->image,
                'color_code' => $product_type->color_code,
                'color_title' => $product_type->color_title,
                'count' => $product->count,
            ];

        });
    }
}
