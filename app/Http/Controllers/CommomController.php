<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandCollection;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\products\ProductSearchCollection;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CommomController extends Controller
{
    public function menu_detail()
    {
        $categorys = Category::all();
        $brands = Brand::all();

        return response()->json([
            'categorys' => new CategoryCollection($categorys),
            'brands' => new BrandCollection($brands),
        ]);
    }

    public function like_product(Product $product, Request $request)
    {
        $user_like = $product->likes()->where('user_id', $request->user()->id)->first();

        if (!$user_like) {
            $product->likes()->create([
                'user_id' => $request->user()->id,
            ]);

        } else {
            $user_like->delete();
        }


        return response('ok');
    }

    public function search(Request $request)
    {
        $validated = $request->validate([
            'search' => ['required' , 'string'] 
        ]);

        $products = Product::where('title', 'LIKE', "%$validated[search]%")->get();

        return response([
            'total' => $products->count(),
            'data' => new ProductSearchCollection($products->take(4))
        ]);
    }
}
