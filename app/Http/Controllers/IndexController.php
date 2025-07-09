<?php

namespace App\Http\Controllers;

use App\Http\Resources\products\ProductCardCollection;
use App\Http\Resources\ProductType\ProductTypeCollection;
use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function new_products()
    {
        $products = Product::orderBy('created_at', 'desc')->limit(5)->get();

        return response()->json([
            'message' => 'new products',
            'data' => new ProductCardCollection($products)
        ]);
    }

    public function discount_products()
    {
        $topProductTypes = ProductType::with('product')
            ->orderByDesc('discount')
            ->get()
            ->unique('product_id')
            ->take(4);


        return response()->json([
            'message' => 'discount products',
            'data' => new ProductTypeCollection($topProductTypes)
        ]);
    }

    public function popular_products()
    {
        $products = Product::withCount('likes')->orderByDesc('likes_count')->take(5)->get();

        return response()->json([
            'message' => 'popular products',
            'data' => new ProductCardCollection($products)
        ]);
    }
}
