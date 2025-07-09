<?php

use App\Http\Controllers\auth\AuthenticationController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommomController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\Panel\IndexController as PanelIndexController;
use App\Http\Controllers\Panel\LikesController;
use App\Http\Controllers\panel\OrdersController;
use App\Http\Controllers\panel\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\AuthCheckMiddleware;
use App\Http\Middleware\OrderDeatilCheckMiddleware;
use App\Http\Middleware\OrderStatusCheckMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\PersonalAccessToken;

Route::prefix('auth')->controller(AuthenticationController::class)->group(function () {

    Route::post('/', 'login');
    Route::post('/verify', 'verify');
    Route::post('/resend', 'resend');
    Route::post('/register', 'register');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', 'user');
        Route::delete('/logout', 'logout');
    });
});

Route::controller(CommomController::class)->group(function () {
    Route::get('/menu-detail', 'menu_detail');
    Route::get('/search', 'search');
    Route::post('/like/{product}', 'like_product')->middleware('auth:sanctum');
});

Route::controller(IndexController::class)->group(function () {
    Route::get('/new-products', 'new_products');
    Route::get('/discount-products', 'discount_products');
    Route::get('/popular-products', 'popular_products');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'products');
    Route::get('/products/{product}', 'single_products')->middleware(AuthCheckMiddleware::class);
    Route::post('/rate/{product}' , 'rate')->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->controller(CommentController::class)->group(function () {
    Route::get('/comments/{product}' , 'comments')->withoutMiddleware('auth:sanctum');
    Route::post('/add-comment/{product}' , 'add_comment');
    Route::post('/add-answer/{comment}' , 'add_answer');
});

Route::middleware('auth:sanctum')->controller(CartController::class)->group(function () {
    Route::post('/cart/{productType}' , 'add_cart');
    Route::post('/cart/{cart}/increase' , 'increase_count');
    Route::post('/cart/{cart}/decrease' , 'decrease_count');

    Route::get('/cart' , 'get_cart');

    Route::post('/payment' , 'payment');
    Route::get('/order-status/{order}' , 'order_status');
});


Route::prefix('/panel')->middleware('auth:sanctum')->group(function () {

    Route::get('/data' , [PanelIndexController::class , 'get_data']);
    Route::get('/likes' , [LikesController::class , 'get_likes']);

    Route::prefix('orders')->controller(OrdersController::class)->group(function () {
        Route::get('/' , 'get_orders');

        Route::prefix('/{order}')->middleware(OrderDeatilCheckMiddleware::class)->group(function () {
            Route::get('/' , 'get_detail_order');
            Route::middleware(OrderStatusCheckMiddleware::class)->group(function () {
                Route::post('/{orderProduct}/increase' , 'increase_count');
                Route::post('/{orderProduct}/decrease' , 'decrease_count');
                Route::post('/payment' , 'payment');
            });
        });
    });

    Route::prefix('profile')->controller(ProfileController::class)->group(function () {

        Route::put('/update' , 'update');

        Route::post('/verify-phone' , 'verify_phone');
        Route::post('/edit-phone' , 'edit_phone');
        Route::post('/resend', 'resend');

    });

});
