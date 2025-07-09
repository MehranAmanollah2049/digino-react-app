<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = [
        'user_id',
        'productType_id',
        'count'
    ];

    public function product_type()
    {
        return $this->belongsTo(ProductType::class , 'productType_id');
    }
}
