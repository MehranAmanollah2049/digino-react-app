<?php


function  getNotificationPattern($key, $provider = null)
{
    $default = config("notification.default");
    $provider = $provider ? $provider : ($default);
    return config("notification.providers.$provider.patterns.$key");
}
