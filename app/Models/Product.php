<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'brand_id',
        'title',
    ];

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function product_types()
    {
        return $this->hasMany(ProductType::class);
    }

    public function product_propertys()
    {
        return $this->hasMany(ProductProperty::class);
    }

    public function total_comments()
    {

        $totalComments = $this->comments->count();
        $totalAnswers = $this->comments->sum(function ($comment) {
            return $comment->answers->count();
        });

        return $totalComments + $totalAnswers;
    }

    public function rates()
    {
        return $this->hasMany(Rate::class);
    }

    public function calculate_rate()
    {
        $rates = $this->rates; // گرفتن همه امتیازات مرتبط
        $total = $rates->count(); // شمارش کل امتیازات

        $result = [
            'total' => $total,
            'rate' => 0
        ];

        if ($total === 0) {
            return $result;
        }

        $average = round($rates->avg('rate'), 1);

        $result['rate'] = $average;

        return $result;
    }
}
