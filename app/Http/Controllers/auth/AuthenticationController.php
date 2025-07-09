<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\auth\LoginRequest;
use App\Http\Requests\auth\RegisterRequest;
use App\Http\Requests\auth\VerifyRequest;
use App\Http\Resources\user\UserResource;
use App\Models\User;
use App\Services\Notifications\Sms\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request, SmsService $smsService)
    {
        $validated = $request->validated();
        $phone = $validated['phone'];

        $code = Cache::remember("authentication-code-$phone", now()->addMinutes(2), fn () => mt_rand(1000, 9999));

        $result = $smsService->send($phone, getNotificationPattern('active-code'), ["$code"]);

        if (!$result) {
            return response()->json(["message" => "connection error"], 500);
        }

        return response()->json(["message" => "otp sent"]);
    }


    public function verify(VerifyRequest $request)
    {
        $validated = $request->validated();
        $phone = $validated['phone'];
        $cachedCode = Cache::get("authentication-code-$phone");

        if (!$cachedCode) {
            return response()->json([
                "message" => "validation error",
                "error" => "کد یکبار مصرف منقضی شده"
            ], 422);
        }

        if ($validated['otp'] != $cachedCode) {
            return response()->json([
                "message" => "validation error",
                "error" => "کد وارد شده صحیح نمی باشد"
            ], 422);
        }

        $user = User::where('phone', $phone)->first();

        if ($user) {
            $token = $user->createToken($phone, ['*'], now()->addMonth())->plainTextToken;

            return response()->json([
                "message" => "login required",
                'user' => new UserResource($user),
                'token' => $token
            ]);
        }

        Cache::put("authentication-register-$phone", true, now()->addMinutes(10));

        return response()->json(["message" => "register required"]);
    }


    public function resend(LoginRequest $request, SmsService $smsService)
    {
        // validation
        $validated = $request->validated();

        // user-phone
        $phone = $validated['phone'];

        // validate code
        if (Cache::has("authentication-code-$phone")) {
            return response()->json([
                "message" => "validation error",
                "error" => "کد یکبار مصرف هنوز منقضی نشده"
            ],422);
        }

        // send code
        $code = mt_rand(1000, 9999);

        $result = $smsService->send($validated['phone'], getNotificationPattern('active-code'), ["$code"]);

        if(!$result) {
            return response()->json([
                "message" => "connection error",
            ],500);
        }

        // store code in cache
        Cache::set("authentication-code-$phone", $code, now()->addMinutes(2));

        //  success
        return response()->json([
            "message" => "otp sent"
        ]);
    }

    public function register(RegisterRequest $request)
    {
        // validation
        $validated = $request->validated();

        // check permission
        if (!Cache::has("authentication-register-$validated[phone]")) {
            return response()->json([
                "message" => "validation error",
                "error" => "لطفا ابتدا شماره موبایل خود را تایید کنید"
            ],422);
        }

        // find user
        $user = User::wherePhone($validated['phone'])->first();

        if ($user) {
            return response()->json([
                'message' => 'phone is incorrect',
                'error' => "این شماره موبایل از قبل ثبت شده"
            ],422);
        }

        // create
        $user = User::create([
            'name' => $validated['name'],
            'lastname' => $validated['lastname'],
            'phone' => $validated['phone'],
        ]);

        // delete cache
        Cache::forget("authentication-register-$validated[phone]");

        // token
        $token = $user->createToken($validated['phone'], ['*'], now()->addMonths(2))->plainTextToken;

        return response()->json([
            "message" => "user created",
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'message' => 'user data',
            'user' => new UserResource($request->user())
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'tokens deleted'
        ]);
    }
}