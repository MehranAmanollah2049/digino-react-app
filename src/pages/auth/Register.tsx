import { Link, useNavigate } from "react-router";
import Logo from "../../components/Logo";
import BaseInput from "../../components/inputs/BaseInput";
import Loading from "../../components/Loading";
import useAuth from "../../stores/auth/useAuth";
import { useState } from "react";
import HttpRequest from "../../api/ApiConfig";
import toast from "react-hot-toast";
import { usePrevUrl } from "../../context/PrevUrlProvider";
import useToken from "../../stores/auth/useToken";
import useUser from "../../stores/auth/useUser";
import { useField } from "../../hooks/useField";
import Nprogress from 'nprogress'

export default function Register() {

    const { resetAuthData , phoneNumber } = useAuth();
    const { prevUrl } = usePrevUrl();
    const { setToken } = useToken()
    const { set_user } = useUser()
    const navigate = useNavigate();

    const { data: name, setData: setName, error: errorName, isValid: isValidName, setError: setNameError, } = useField((value) => {
        return value == '' ? 'لطفا نام خود را وارد کنید' : null;
    }, '');

    const { data: family, setData: setFamily, error: errorFamily, isValid: isValidFamily, setError: setFamilyError, } = useField((value) => {
        return value == '' ? 'لطفا نام خانوادگی خود را وارد کنید' : null;
    }, '');


    const [isLoading, setLoading] = useState<boolean>(false);

    const registerSubmit = () => {
        // validation
        if (!isValidName()) {
            setNameError();
        }

        if (!isValidFamily()) {
            setFamilyError()
        }

        if (isValidName() && isValidFamily()) {
            // request
            if (!isLoading) {
                setLoading(true)
                Nprogress.start()

                HttpRequest.post('/auth/register', {
                    name,
                    lastname: family,
                    phone: phoneNumber
                })
                    .then(res => {
                        setLoading(false)
                        Nprogress.done()

                        if (res) {

                            setToken(res.data.token)
                            set_user(res.data.user)

                            toast.success(`خوش آمدید`)
                            navigate(prevUrl)

                            setTimeout(() => {
                                resetAuthData()
                            }, 1000);
                        }
                    })
                    .catch(() => {
                        setLoading(false)
                        Nprogress.done()
                    })
            }
        }
    };

    return (
        <>
            <div className="w-full relative">
                <div className="w-full h-[36px] flex items-center justify-between">
                    <Logo />
                    <Link
                        to="/auth"
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
                        احراز هویت
                    </p>
                    <p className="w-full text-right text-gray-600">
                        جهت ثبت نام اطلاعات زیر را وارد کنید
                    </p>
                </div>
                <div className="w-full mt-4">
                    <BaseInput
                        title="نام"
                        state={name}
                        setState={setName}
                        error={errorName}
                    />
                </div>
                <div className="w-full mt-4">
                    <BaseInput
                        title="نام خانوادگی"
                        state={family}
                        setState={setFamily}
                        error={errorFamily}
                    />
                </div>
                <p className="mt-3 text-[14px] text-gray-500">
                    عضویت شما به منزله پذیرفتن قوانین و مقررات میباشد.
                </p>
            </div>
            <div className={`btn-dark text-[15.5px] w-full mt-7 cursor-pointer !h-[50px] ${isLoading ? "loading" : ""}`} onClick={registerSubmit}>
                {isLoading ? <Loading /> : "ثبت نام"}
            </div>
        </>
    )
}