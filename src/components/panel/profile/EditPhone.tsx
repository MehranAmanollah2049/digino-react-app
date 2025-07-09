import { useEffect, useState } from "react";
import { useField } from "../../../hooks/useField";
import useUser from "../../../stores/auth/useUser";
import Loading from "../../Loading";
import BaseInput from "../../inputs/BaseInput";
import Nprogress from 'nprogress'
import HttpRequest from "../../../api/ApiConfig";
import toast from "react-hot-toast";
import VerifyPhoneBox from "./VerifyPhoneBox";

export default function EditPhone() {

    const { user } = useUser()

    const { data: phone, setData: setPhone, error: errorPhone, isValid: isValidPhone, setError: setPhoneError, } = useField((value) => {
        return !/^[0-9]{11}$/.test(value) ? "شماره موبایل معتبر نمی باشد" : null;
    }, user?.phone ?? '');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const FormHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!isValidPhone()) {
            setPhoneError();
        }

        if (user?.phone == phone) {
            toast.error("اطلاعات جدیدی برای ویرایش یافت نشد")
            return
        }

        if (isValidPhone() && !isLoading) {
            setIsLoading(true)
            Nprogress.start()

            HttpRequest.post(`/panel/profile/verify-phone`, {
                phone,
            })
                .then(res => {
                    setIsLoading(false)
                    Nprogress.done()

                    if (res) {
                        toast.success(`کد یکبار مصرف برای ${phone} ارسال گردید`)
                        setIsActive(true)
                    }
                })
                .catch(() => {
                    setIsLoading(false)
                    Nprogress.done()
                })
        }
    }

    useEffect(() => {
        setPhone(user?.phone ?? '')
    }, [user?.phone])

    return (
        <>
            <div className="w-full bg-white rounded-xl px-5 py-5 pt-8 min-[501px]:px-8 min-[501px]:py-6 mt-5">
                <div className="w-full flex flex-col items-start justify-between mb-8 min-[501px]:flex-row min-[501px]:items-center">
                    <p
                        className="font-heavy text-[18px] text-theme pr-5 flex items-center justify-center relative min-[501px]:text-[20px] after:size-2 after:rounded-full after:bg-theme after:absolute after:content-[''] after:translate-y-[-0.5px] after:right-0">
                        ویرایش شماره موبایل
                    </p>
                </div>
                <form className="w-full flex flex-col items-center justify-center gap-2" onSubmit={FormHandler}>
                    <div className="w-full flex flex-col gap-4 min-[640px]:gap-2 min-[640px]:flex-row">
                        <div className="w-full min-[640px]:h-[72px]">
                            <BaseInput
                                title="09xx-xxx-xxxx"
                                state={phone}
                                setState={setPhone}
                                rtl={false}
                                error={errorPhone}
                                onlyNumber={true}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-end mt-2 min-[450px]:flex-row min-[450px]:items-end">
                        <button
                            type="submit"
                            className={`btn-dark transition-all w-full h-[44px] text-[15px] px-7 min-[450px]:w-auto ${isLoading ? 'loading' : ''}`}
                        >
                            {isLoading ? <Loading /> : 'ویرایش اطلاعات'}
                        </button>
                    </div>
                </form>
            </div>
            <VerifyPhoneBox isActive={isActive} setIsActive={setIsActive} phone={phone} />
        </>
    )
}