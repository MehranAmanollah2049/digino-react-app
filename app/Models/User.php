<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable , HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'lastname',
        'phone',
        'is_admin'
    ];

    public function cart()
    {
        return $this->hasMany(Cart::class);
    }

    public function available_cart()
    {
        return $this->cart->filter(function ($cart) {
            return $cart->count <= $cart->product_type->count;
        });
    }

    public function likes()
    {
        return $this->belongsToMany(Product::class , 'likes');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
