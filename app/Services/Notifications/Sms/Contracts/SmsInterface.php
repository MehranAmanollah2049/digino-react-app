<?php

namespace App\Services\Notifications\Sms\Contracts;

interface SmsInterface
{
    public function send(string $phoneNumber , mixed $bodyId , array $args);
}