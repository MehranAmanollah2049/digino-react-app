<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PhoneRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $pattern = '/^09\d{9}$/';

        if(strlen($value) != 11 || !preg_match($pattern,$value))
        {
            $fail("شماره موبایل وارد شده معتبر نمی باشد");
        }
    }
}
