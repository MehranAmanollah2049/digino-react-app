<?php

namespace App\Services\Notifications\Sms;

use App\Services\Notifications\Sms\Contracts\SmsInterface;

class SmsService
{

    public function __construct(public SmsInterface $smsInterface)
    {    
    }

    public function send() 
    {
        $arguments = func_get_args();
        return $this->smsInterface->send(...$arguments);    
    }

}