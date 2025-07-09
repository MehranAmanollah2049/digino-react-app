<?php

namespace App\Http\Resources\orders\detail;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'phone' => $this->phone,
            'code' => $this->code,
            'status' => $this->status,
            'driver' => $this->driver,
            'created_at' => Carbon::parse($this->updated_at)->diffForHumans(),
            'products' => new OrderProductCollection($this->products)
        ];
    }
}
