<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'phone',
        'code',
        'transaction_id',
        'driver',
        'status'
    ];

    public function products()
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function total_payment()
    {
        if ($this->status == 'پرداخت شده') {
            return $this->products->sum(function ($product) {
                return $product->payment * $product->count;
            });
        }


        return $this->products->sum(function ($product) {
            return $product->product_type->payment * $product->count;
        });
    }

    public function is_all_products_available()
    {
        $products = $this->products;

        foreach($products as $product)
        {
            if($product->count > $product->product_type->count) {
                return false;
            }
        }

        return true;
    }
}
