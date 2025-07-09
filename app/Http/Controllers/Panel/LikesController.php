<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Resources\products\ProductCardCollection;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    public function get_likes(Request $request)
    {
        $products = $request->user()->likes();

        if($request->has('limit')) 
        {
            $products->limit($request->limit);
        }

        return response([
            'data' => new ProductCardCollection($products->orderByDesc('created_at')->get())
        ]);
    }
}
