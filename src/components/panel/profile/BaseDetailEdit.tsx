import { useEffect, useState } from "react"
import Loading from "../../Loading"
import BaseInput from "../../inputs/BaseInput"
import { useField } from "../../../hooks/useField";
import useUser from "../../../stores/auth/useUser";
import HttpRequest from "../../../api/ApiConfig";
import Nprogress from 'nprogress'
import toast from "react-hot-toast";

export default function BaseDetailEdit() {

    const { user, update_user_name_family } = useUser()

    const { data: name, setData: setName, error: errorName, isValid: isValidName, setError: setNameError, } = useField((value) => {
        return value == '' ? 'لطفا نام خود را وارد کنید' : null;
    }, user?.name ?? '');

    const { data: family, setData: setFamily, error: errorFamily, isValid: isValidFamily, setError: setFamilyError, } = useField((value) => {
        return value == '' ? 'لطفا نام خانوادگی خود را وارد کنید' : null;
    }, user?.lastname ?? '');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const FormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidName()) {
            setNameError();
        }

        if (!isValidFamily()) {
            setFamilyError()
        }

        if (isValidName() && isValidFamily() && !isLoading) {
            setIsLoading(true);
            Nprogress.start()

            HttpRequest.put(`/panel/profile/update`, {
                name,
                lastname: family,
            })
                .then(res => {
                    setIsLoading(false)
                    Nprogress.done()

                    if (res) {
                        toast.success("اطلاعات ویرایش شدند")

                        update_user_name_family(name, family)
                    }
                })
                .catch(() => {
                    setIsLoading(false)
                    Nprogress.done()
                })
        }
    }

    useEffect(() => {
        setName(user?.name ?? '');
        setFamily(user?.lastname ?? '')
    }, [user?.name, user?.lastname])

    return (
        <div className="w-full bg-white rounded-xl px-5 py-5 pt-8 min-[501px]:px-8 min-[501px]:py-6">
            <div className="w-full flex flex-col items-start justify-between mb-8 min-[501px]:flex-row min-[501px]:items-center">
                <p
                    className="font-heavy text-[18px] text-theme pr-5 flex items-center justify-center relative min-[501px]:text-[20px] after:size-2 after:rounded-full after:bg-theme after:absolute after:content-[''] after:translate-y-[-0.5px] after:right-0">
                    ویرایش اطلاعات
                </p>
            </div>
            <form className="w-full flex flex-col items-center justify-center gap-2" onSubmit={FormHandler}>
                <div className="w-full flex flex-col gap-4 min-[640px]:gap-2 min-[640px]:flex-row">
                    <div className="w-full min-[640px]:h-[72px] min-[640px]:w-1/2">
                        <BaseInput
                            title="نام"
                            state={name}
                            setState={setName}
                            error={errorName}
                        />
                    </div>
                    <div className="w-full min-[640px]:h-[72px] min-[640px]:w-1/2">
                        <BaseInput
                            title="نام خانوادگی"
                            state={family}
                            setState={setFamily}
                            error={errorFamily}
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
    )
}