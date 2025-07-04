import { Link, useNavigate } from "react-router";
import Logo from "../../components/Logo";
import BaseInput from "../../components/inputs/BaseInput";
import { useState } from "react";
import { useField } from "../../hooks/useField";
import Loading from "../../components/Loading";
import HttpRequest from './../../api/ApiConfig'
import toast from "react-hot-toast";
import useAuth from "../../stores/auth/useAuth";

export default function Login() {

  const { phoneNumber, setPhoneNumber } = useAuth();
  const navigate = useNavigate();

  const { data: phone, setData: setPhone, error: errorPhone, isValid: isValidPhone, setError: setPhoneError, } = useField((value) => {
    return !/^[0-9]{11}$/.test(value) ? "شماره موبایل معتبر نمی باشد" : null;
  }, phoneNumber || '');

  const [isLoading, setLoading] = useState<boolean>(false);

  const loginSubmit = () => {
    // validation
    if (!isValidPhone()) {
      return setPhoneError(null);
    }

    // request
    if (!isLoading) {
      setLoading(true)

      HttpRequest.post('/auth', {
        phone
      })
        .then(res => {
          if (res) {
            setPhoneNumber(phone)
            toast.success(`کد تایید برای شماره ${phone} ارسال گردید`)
            navigate('/auth/verify')
          }
          else {
            setLoading(false)
          }
        })
        .catch(() => {          
          setLoading(false)
        })
    }
  };

  return (
    <>
      <div className="w-full relative">
        <div className="w-full h-[36px] flex items-center justify-between">
          <Logo />
          <Link
            to="/"
            className="rounded-md bg-gray-200 flex items-center justify-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 fill-black"
              id="Outline"
              viewBox="0 0 24 24"
              width="512"
              height="512"
            >
              <path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
            </svg>
          </Link>
        </div>
        <div className="w-full mt-5">
          <p className="w-full text-right font-bold text-[22px] text-dark-500 mb-1">
            ورود یا ثبت نام
          </p>
          <p className="w-full text-right text-gray-600">
            لطفا برای ورود شماره همراه خود را وارد کنید
          </p>
        </div>
        <div className="w-full mt-4">
          <BaseInput
            title="09xx-xxx-xxxx"
            state={phone}
            setState={setPhone}
            rtl={false}
            error={errorPhone}
            onlyNumber={true}
          />
        </div>
        <p className="mt-3 text-[14px] text-gray-500">
          کد تایید به شماره ای که وارد میکنید ارسال می شود
        </p>
      </div>
      <div className={`btn-dark text-[15.5px] w-full mt-7 cursor-pointer !h-[50px] ${isLoading ? "loading" : ""}`} onClick={loginSubmit}>
        {isLoading ? <Loading /> : "ادامه"}
      </div>
    </>
  );
}
