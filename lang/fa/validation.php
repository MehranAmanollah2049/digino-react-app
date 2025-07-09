<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'فیلد :attribute باید تایید شود',
    'accepted_if' => 'زمانی که فیلد :other برابر :value است :attribute باید تایید شود',
    'active_url' => 'فیلد :attribute یک آدرس سایت معتبر نیست',
    'after' => 'فیلد :attribute باید تاریخی بعد از :date باشد',
    'after_or_equal' => 'فیلد :attribute باید تاریخی مساوی یا بعد از :date باشد',
    'alpha' => 'فیلد :attribute باید تنها شامل حروف باشد',
    'alpha_dash' => 'فیلد :attribute باید تنها شامل حروف، اعداد، خط تیره و زیر خط باشد',
    'alpha_num' => 'فیلد :attribute باید تنها شامل حروف و اعداد باشد',
    'array' => 'فیلد :attribute باید آرایه باشد',
    'before' => 'فیلد :attribute باید تاریخی قبل از :date باشد',
    'before_or_equal' => 'فیلد :attribute باید تاریخی مساوی یا قبل از :date باشد',
    'between' => [
        'numeric' => 'فیلد :attribute باید بین :min و :max باشد',
        'file' => 'فیلد :attribute باید بین :min و :max کیلوبایت باشد',
        'string' => 'فیلد :attribute باید بین :min و :max کاراکتر باشد',
        'array' => 'فیلد :attribute باید بین :min و :max آیتم باشد',
    ],
    'boolean' => 'فیلد :attribute تنها می تواند صحیح یا غلط باشد',
    'confirmed' => 'تایید مجدد فیلد :attribute صحیح نمی باشد',
    'current_password' => 'رمزعبور صحیح نمی باشد',
    'date' => 'فیلد :attribute یک تاریخ صحیح نمی باشد',
    'date_equals' => 'فیلد :attribute باید تاریخی مساوی با :date باشد',
    'date_format' => 'فیلد :attribute با فرمت :format همخوانی ندارد',
    'different' => 'فیلد :attribute و :other باید متفاوت باشند',
    'digits' => 'فیلد :attribute باید :digits عدد باشد',
    'digits_between' => 'فیلد :attribute باید بین :min و :max عدد باشد',
    'dimensions' => 'ابعاد تصویر فیلد :attribute مجاز نمی باشد',
    'distinct' => 'فیلد :attribute دارای افزونگی داده می باشد',
    'email' => 'فیلد :attribute باید یک آدرس ایمیل صحیح باشد',
    'ends_with' => 'فیلد :attribute باید با یکی از این مقادیر پایان یابد، :values',
    'exists' => 'فیلد انتخاب شده :attribute صحیح نمی باشد',
    'file' => 'فیلد :attribute باید یک فایل باشد',
    'filled' => 'فیلد :attribute نمی تواند خالی باشد',
    'gt' => [
        'numeric' => 'فیلد :attribute باید بزرگتر از :value باشد',
        'file' => 'فیلد :attribute باید بزرگتر از :value کیلوبایت باشد',
        'string' => 'فیلد :attribute باید بزرگتر از :value کاراکتر باشد',
        'array' => 'فیلد :attribute باید بیشتر از :value آیتم باشد',
    ],
    'gte' => [
        'numeric' => 'فیلد :attribute باید بزرگتر یا مساوی :value باشد',
        'file' => 'فیلد :attribute باید بزرگتر یا مساوی :value کیلوبایت باشد',
        'string' => 'فیلد :attribute باید بزرگتر یا مساوی :value کاراکتر باشد',
        'array' => 'فیلد :attribute باید :value آیتم یا بیشتر داشته باشد',
    ],
    'image' => 'فیلد :attribute باید از نوع تصویر باشد',
    'in' => 'فیلد انتخابی :attribute صحیح نمی باشد',
    'in_array' => 'فیلد :attribute در :other وجود ندارد',
    'integer' => 'فیلد :attribute باید از نوع عددی باشد',
    'ip' => 'فیلد :attribute باید آی پی آدرس باشد',
    'ipv4' => 'فیلد :attribute باید آی پی آدرس ورژن 4 باشد',
    'ipv6' => 'فیلد :attribute باید آی پی آدرس ورژن 6 باشد',
    'json' => 'فیلد :attribute باید از نوع رشته جیسون باشد',
    'lt' => [
        'numeric' => 'فیلد :attribute باید کمتر از :value باشد',
        'file' => 'فیلد :attribute باید کمتر از :value کیلوبایت باشد',
        'string' => 'فیلد :attribute باید کمتر از :value کاراکتر باشد',
        'array' => 'فیلد :attribute باید کمتر از :value آیتم داشته باشد',
    ],
    'lte' => [
        'numeric' => 'فیلد :attribute باید مساوی یا کمتر از :value باشد',
        'file' => 'فیلد :attribute باید مساوی یا کمتر از :value کیلوبایت باشد',
        'string' => 'فیلد :attribute باید مساوی یا کمتر از :value کاراکتر باشد',
        'array' => 'فیلد :attribute نباید کمتر از :value آیتم داشته باشد',
    ],
    'max' => [
        'numeric' => 'فیلد :attribute نباید بزرگتر از :max باشد',
        'file' => 'فیلد :attribute نباید بزرگتر از :max کیلوبایت باشد',
        'string' => 'فیلد :attribute نباید بزرگتر از :max کاراکتر باشد',
        'array' => 'فیلد :attribute نباید بیشتر از :max آیتم داشته باشد',
    ],
    'mimes' => 'فیلد :attribute باید دارای یکی از این فرمت ها باشد: :values',
    'mimetypes' =>  'فیلد :attribute باید دارای یکی از این فرمت ها باشد: :values',
    'min' => [
        'numeric' => 'فیلد :attribute باید حداقل :min باشد',
        'file' => 'فیلد :attribute باید حداقل :min کیلوبایت باشد',
        'string' => 'فیلد :attribute باید حداقل :min کاراکتر باشد',
        'array' => 'فیلد :attribute باید حداقل :min آیتم داشته باشد',
    ],
    'multiple_of' => 'فیلد :attribute باید حاصل ضرب :value باشد',
    'not_in' => 'فیلد انتخابی :attribute صحیح نمی باشد',
    'not_regex' => 'فرمت فیلد :attribute صحیح نمی باشد',
    'numeric' => 'فیلد :attribute باید از نوع عددی باشد',
//    'password' => 'رمزعبور صحیح نمی باشد',
    'present' => 'فیلد :attribute باید از نوع درصد باشد',
    'regex' => 'فرمت فیلد :attribute صحیح نمی باشد',
    'required' => 'تکمیل فیلد :attribute الزامی است',
    'required_if' => 'تکمیل فیلد :attribute زمانی که :other دارای مقدار :value است الزامی می باشد',
    'required_unless' => 'تکمیل فیلد :attribute الزامی می باشد مگر :other دارای مقدار :values باشد',
    'required_with' => 'تکمیل فیلد :attribute زمانی که مقدار :values درصد است الزامی است',
    'required_with_all' => 'تکمیل فیلد :attribute زمانی که مقادیر :values درصد است الزامی می باشد',
    'required_without' => 'تکمیل فیلد :attribute زمانی که مقدار :values درصد نیست الزامی است',
    'required_without_all' => 'تکمیل فیلد :attribute زمانی که هیچ کدام از مقادیر :values درصد نیست الزامی است',
    'same' => 'فیلد های :attribute و :other باید یکی باشند',
    'size' => [
        'numeric' => 'فیلد :attribute باید :size باشد',
        'file' => 'فیلد :attribute باید :size کیلوبایت باشد',
        'string' => 'فیلد :attribute باید :size  کاراکتر باشد',
        'array' => 'فیلد :attribute باید شامل :size آیتم باشد',
    ],
    'starts_with' => 'فیلد :attribute باید با یکی از این مقادیر شروع شود، :values',
    'string' => 'فیلد :attribute باید تنها شامل حروف باشد',
    'timezone' => 'فیلد :attribute باید از نوع منطقه زمانی صحیح باشد',
    'unique' => 'این :attribute از قبل ثبت شده است',
    'uploaded' => 'آپلود فیلد :attribute شکست خورد',
    'url' => 'فرمت :attribute اشتباه است',
    'uuid' => 'فیلد :attribute باید یک UUID صحیح باشد',
    'captcha_api' => ':attribute وارد شده صحیح نمی باشد',
    'password' => [
        'mixed' => ':attribute باید حداقل شامل یک حرف بزرگ و یک حرف کوچک انگلیسی باشد',
        'letters' => ':attribute باید حداقل شامل یک حرف باشد',
        'symbols' => ':attribute باید حداقل شامل یک سمبل باشد',
        'numbers' => ':attribute باید حداقل شامل یک عدد باشد',
        'uncompromised' => 'custom-message',
        'password' => 'رمزعبور صحیح نمی باشد'
    ],
    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'name' => 'نام',
        'username' => 'نام کاربری',
        'email' => 'ایمیل',
        'first_name' => 'نام',
        'last_name' => 'نام خانوادگی',
        'password' => 'گذرواژه',
        'password_confirmation' => 'تاییدیه گذرواژه',
        'city' => 'شهر',
        'state' => 'استان',
        'country' => 'کشور',
        'address' => 'آدرس',
        'phone' => 'تلفن',
        'mobile' => 'تلفن همراه',
        'age' => 'سن',
        'sex' => 'جنسیت',
        'gender' => 'جنسیت',
        'day' => 'روز',
        'month' => 'ماه',
        'year' => 'سال',
        'hour' => 'ساعت',
        'minute' => 'دقیقه',
        'second' => 'ثانیه',
        'title' => 'عنوان',
        'text' => 'متن',
        'content' => 'محتوا',
        'description' => 'توضیحات',
        'date' => 'تاریخ',
        'time' => 'زمان',
        'available' => 'موجود',
        'type' => 'نوع',
        'img' => 'تصویر',
        'image' => 'تصویر',
        'size' => 'اندازه',
        'color' => 'رنگ',
        'captcha' => 'کد امنیتی',
        'price' => 'قیمت',
        'pic' => 'تصویر',
        'link' => 'لینک',
        'mobile_number' => 'شماره تماس',
        'work_number' => 'شماره تماس ثابت',
        'otp' => 'کد یکبار مصرف'
    ],
];
