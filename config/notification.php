<?php

use App\Services\Notifications\Sms\Providers\MelipayamakProvider;

return [
    'default' => env('SMS_DEFAULT_SERVICE' , 'melipayamak'),

    'providers' => [
        'melipayamak' => [
            'service' => MelipayamakProvider::class,
            'auth' => [
                'username' => env('MELIPAYAMAK_USERNAME'),
                'password' => env('MELIPAYAMAK_PASSWORD'),
            ],
            'url' => env('MELIPAYAMAK_URL', 'https://console.melipayamak.com/api/send/shared/' . env('MELIPAYAMAK_TOKEN')),
            'patterns' => [
                'active-code' => 311770,
                'payment-code' => 311771
            ]
        ]
    ]
];