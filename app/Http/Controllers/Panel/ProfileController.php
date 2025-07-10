<?php

namespace App\Http\Controllers\panel;

use App\Http\Controllers\Controller;
use App\Http\Requests\auth\LoginRequest;
use App\Http\Requests\auth\VerifyRequest;
use App\Models\User;
use App\Services\Notifications\Sms\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'lastname' => ['required', 'string'],
        ]);

        $request->user()->update($validated);

        return response('ok');
    }

    public function verify_phone(LoginRequest $request,SmsService $smsService)
    {
        $validated = $request->validated();

        if (User::wherePhone($validated['phone'])->first()) {
            return response()->json([
                'error' => 'این شماره موبایل از قبل ثبت شده'
            ], 422);
        }

        // send code
        $code = mt_rand(1000, 9999);

        $result = $smsService->send($validated['phone'], getNotificationPattern('active-code'), ["$code"]);

        if (!$result) {
            return response()->json([
                "message" => "connection error",
            ], 500);
        }

        // store code in cache
        $code = Cache::remember("profile-edit-phone-code-$validated[phone]", now()->addMinutes(2), fn () => $code);

        //  success
        return response()->json([
            "message" => "otp sent"
        ]);
    }

    public function edit_phone(VerifyRequest $request)
    {
        // validation
        $validated = $request->validated();

        // user-phone
        $phone = $validated['phone'];

        $cachedCode = Cache::get("profile-edit-phone-code-$phone");

        // validate code
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


        // find user
        $request->user()->update([
            'phone' => $phone
        ]);

        // register permission
        Cache::forget("profile-edit-phone-code-$phone");

        return response()->json([
            "message" => "phone edited"
        ]);
    }

    public function resend(LoginRequest $request, SmsService $smsService)
    {
        // validation
        $validated = $request->validated();

        // user-phone
        $phone = $validated['phone'];

        // validate code
        if (Cache::has("profile-edit-phone-code-$phone")) {
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
        Cache::set("profile-edit-phone-code-$phone", $code, now()->addMinutes(2));

        //  success
        return response()->json([
            "message" => "otp sent"
        ]);
    }
}
