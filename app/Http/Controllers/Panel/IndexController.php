<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function get_data(Request $request)
    {
        return response([
            'data' => [
                $request->user()->orders()->where('status' , 'پرداخت شده')->get()->count(),
                $request->user()->orders()->where('status' , 'پرداخت نشده')->get()->count(),
                $request->user()->likes->count(),
                $request->user()->cart->count(),
            ]
        ]);
    }
}
