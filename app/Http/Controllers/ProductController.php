<?php

namespace App\Http\Controllers;

use App\Http\Resources\products\ProductsFilterCollection;
use App\Http\Resources\single_product\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function products(Request $request)
    {
        $products = Product::query();

        if ($request->has('categorys') && !empty(json_decode($request->categorys))) {
            $products->whereIn('category_id', json_decode($request->categorys));
        }

        if ($request->has('brands') && !empty(json_decode($request->brands))) {
            $products->whereIn('brand_id', json_decode($request->brands));
        }

        if ($request->has('price_min') && $request->has('price_max')) {
            $products->whereHas('product_types', function ($query) use ($request) {
                $query->whereBetween('payment', [$request->price_min, $request->price_max]);
            });
        }

        if ($request->has('search') && $request->search != '') {
            $products->where("title", "LIKE", "%$request->search%");
        }

        if ($request->has('orderBy')) {
            if ($request->orderBy == 'news') {
                $products->orderByDesc('created_at');
            } else if ($request->orderBy == 'olds') {
                $products->orderBy('created_at');
            } else if ($request->orderBy == 'populars') {
                $products->withCount('likes')
                    ->orderByDesc('likes_count');
            }
        }

        $result = $products->paginate($request->perPage ?? 12);

        return response()->json([
            'data' => new ProductsFilterCollection($result),
            'pagination' => [
                'current' => $result->currentPage(),
                'total' => $result->lastPage(),
            ],
        ]);
    }

    public function single_products(Product $product)
    {
        return new ProductResource($product);
    }

    public function rate(Request $request,Product $product)
    {
        $validated = $request->validate([
            'rate' => ['required','numeric']
        ]);

        if($product->rates()->where('user_id' , $request->user()->id)->first())
        {
            return response([
                'error' => 'امتیاز شما از قبل ثبت شده'
            ],422);
        }

        $product->rates()->create([
            'user_id' => $request->user()->id,
            'rate' => $validated['rate']
        ]);

        return response($product->calculate_rate());
    }
}
