<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    protected $fillable = [
        'order_id',
        'productType_id',
        'discount',
        'price',
        'payment',
        'count'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product_type()
    {
        return $this->belongsTo(ProductType::class , 'productType_id');
    }
}
