<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // همه متدها (GET, POST, PUT, DELETE)

    'allowed_origins' => ['https://store.mehran-dev.com','http://store.mehran-dev.com'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // همه هدرها

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // اگر کوکی و سشن نیاز دارید
];
