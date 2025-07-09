<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->renderable(function (Throwable $e) {
            if (request()->expectsJson()) {
                // validation exception
                if ($e instanceof ValidationException) {
                    $errors = [];

                    foreach ($e->errors() as $key => $msg) {
                        $errors = array_merge($msg, $errors);
                    }

                    return response()->json([
                        "message" => "validation error",
                        "error" => $errors[0]
                    ],422);
                }
            }
        });
    })->create();
