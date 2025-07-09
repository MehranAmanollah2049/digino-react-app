<?php

namespace App\Providers;

use App\Services\Notifications\Sms\Contracts\SmsInterface;
use App\Services\Notifications\Sms\Providers\MelipayamakProvider;
use Illuminate\Support\Facades\App;
use Illuminate\Support\ServiceProvider;

class NotificationProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $default = config('notification.default');
        $provider = config("notification.providers.{$default}.service");
        $provider = is_subclass_of($provider , SmsInterface::class) ? $provider : MelipayamakProvider::class;

        App::bind(SmsInterface::class , $provider);
    }
}
