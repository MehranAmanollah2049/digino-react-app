<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    protected $fillable = [
        'product_id',
        'image',
        'color_code',
        'color_title',
        'discount',
        'price',
        'payment',
        'count'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
