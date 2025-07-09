<?php

namespace App\Services\Notifications\Sms\Providers;

use App\Services\Notifications\Sms\Contracts\SmsInterface;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class MelipayamakProvider implements SmsInterface
{
    public string $url;

    public function __construct()
    {
        $this->url = config('notification.providers.melipayamak.url');
    }

    public function send(string $phoneNumber , mixed $bodyId , array $arguments)
    {
        try 
        {

            $client = new Client();
            $response = $client->request('POST', $this->url , [
                'json' => [
                    'bodyId' => $bodyId,
                    'to' => $phoneNumber,
                    'args' => [...$arguments]
                ]
            ]);

            if($response->getStatusCode() == 200)
            {
                return json_decode($response->getBody(),true)['recId'];
            }

            return false;

        } catch(Exception $e)
        {
            Log::error($e->getMessage());
            return false;
        }
    }
}