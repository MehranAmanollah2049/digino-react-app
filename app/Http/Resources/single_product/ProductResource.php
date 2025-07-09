<?php

namespace App\Http\Resources\single_product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{

    public static $wrap = null;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $category = $this->category;
        $brand = $this->brand;

        $rate = $this->calculate_rate();

        return [
            'id' => $this->id,
            'category' => [
                'id' => $category->id,
                'title' => $category->title,
            ],
            'brand' => [
                'id' => $brand->id,
                'title' => $brand->title,
            ],
            'likes' => $this->likes->pluck('user_id'),
            'rate' => [
                'total' => $rate['total'],
                'rate' => $rate['rate']
            ],
            'title' => $this->title,
            'total_cmt' => $this->total_comments(),
            'propertys' => $this->product_propertys->pluck('title'),
            'types' => new ProductTypeCollection($this->product_types),
        ];
    }
}
