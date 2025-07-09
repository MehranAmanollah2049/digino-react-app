<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\panel\OrdersController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::match(['get', 'post'] , 'verify' , [CartController::class , 'verify'])->name('payment.callback')->withoutMiddleware(VerifyCsrfToken::class);
Route::match(['get', 'post'] , 'verify-order-panel' , [OrdersController::class , 'verify'])->name('payment.panel.callback')->withoutMiddleware(VerifyCsrfToken::class);