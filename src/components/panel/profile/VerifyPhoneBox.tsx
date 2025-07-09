import { Sheet } from 'react-modal-sheet';
import OtpInput from '../../inputs/OtpInput';
import { useField } from '../../../hooks/useField';
import { useEffect, useRef, useState } from 'react';
import Nprogress from 'nprogress'
import HttpRequest from '../../../api/ApiConfig';
import toast from 'react-hot-toast';
import Loading from '../../Loading';
import useUser from '../../../stores/auth/useUser';

type Props = {
    isActive: boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
    phone: string
}

export default function VerifyPhoneBox({ isActive, setIsActive, phone }: Props) {

    const { update_user_phone } = useUser()

    const { data: code, setData: setCode, error: errorCode, isValid: isValidCode, setError: setCodeError } = useField((value) => {
        return value.join("").length != 4 ? "کد وارد شده صحیح نمی باشد" : null;
    }, ["", "", "", ""]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const verify = (): void => {
        // validation
        if (!isValidCode()) {
            setCodeError()
            return
        }

        // request
        if (!isLoading) {
            setIsLoading(true)
            Nprogress.start();

            HttpRequest.post('/panel/profile/edit-phone', {
                phone,
                otp: code.join('').trim()
            })
                .then(res => {
                    setIsLoading(false)
                    Nprogress.done()

                    if (res) {
                        setIsActive(false)
                        update_user_phone(phone)
                        toast.success("شماره موبایل شما با موفقیت تایید شد")
                        setCode(['', '', '', '', ''])
                    }
                })
                .catch(() => {
                    setIsLoading(false)
                    Nprogress.done()
                })
        }
    }

    // resend
    const [resendLoading, setResendLoading] = useState<boolean>(false);
    const timerDuration = 120;


    let resendHandler = () => {

        if (seconds > 0) {
            return
        }

        if (!resendLoading) {
            setResendLoading(true)
            Nprogress.start()

            // request
            HttpRequest.post('/panel/profile/resend', {
                phone
            })
                .then(res => {

                    setResendLoading(false)
                    Nprogress.done()

                    if (res) {
                        toast.success(`کد تایید مجددا ارسال گردید`)
                        setSeconds(timerDuration)
                        startTimer()
                        setCode(['', '', '', ''])
                    }
                })
                .catch(() => {
                    setResendLoading(false);
                    Nprogress.done()
                })

        }
    }

    // timer
    const [seconds, setSeconds] = useState<number>(timerDuration);
    const timerRef = useRef<any>(null);

    const startTimer = () => {
        // Clear any existing interval
        if (timerRef.current) clearInterval(timerRef.current);

        // Start new interval
        timerRef.current = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        startTimer(); // Start on mount

        return () => clearInterval(timerRef.current); // Cleanup on unmount
    }, []);

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    let formatTimer = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    return (
        <Sheet
            isOpen={isActive}
            onClose={() => setIsActive(false)}
            detent="content-height"
            tweenConfig={{
                ease: "linear",
                duration: 0.4
            }}
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <div className="w-full flex items-center justify-center pb-5 px-4">
                        <div className="w-full min-[570px]:w-[400px]">
                            <div className="w-full relative">
                                <div className="w-full mt-5">
                                    <p className="w-full text-right font-bold text-[20px] text-dark-500 mb-1">
                                        تایید شماره موبایل
                                    </p>
                                    <p className="w-full text-right text-gray-600 text-[14.5px]">
                                        کد ارسال‌شده به شماره "{phone}" را وارد کنید.
                                    </p>
                                </div>
                                <div className="w-full h-[58px] md:h-[63px] mt-4 flex gap-2" style={{ direction: "ltr" }}>
                                    <OtpInput state={code} setState={setCode} error={errorCode} />
                                    <div onClick={resendHandler} className={`w-1/5 h-full bg-gray-100 rounded-md flex items-center justify-center flex-col gap-[2px] ${seconds > 0 ? "pointer-events-none" : "cursor-pointer"}`}>
                                        {!resendLoading ? (
                                            <>
                                                <svg
                                                    width="16"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    className="size-5 -translate-y-[1.5px] fill-gray-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12 5.25C16.5562 5.25 20.25 8.94379 20.25 13.5C20.25 18.0562 16.5562 21.75 12 21.75C7.44379 21.75 3.75 18.0562 3.75 13.5C3.75 12.1656 4.06774 10.8751 4.6679 9.71531C4.85827 9.34743 5.31081 9.20353 5.67869 9.3939C6.04657 9.58427 6.19047 10.0368 6.0001 10.4047C5.50958 11.3526 5.25 12.4069 5.25 13.5C5.25 17.2278 8.27221 20.25 12 20.25C15.7278 20.25 18.75 17.2278 18.75 13.5C18.75 9.85153 15.855 6.87892 12.237 6.75408L12 6.75H8.5C8.08579 6.75 7.75 6.41421 7.75 6C7.75 5.6203 8.03215 5.30651 8.39823 5.25685L8.5 5.25H12Z"></path>
                                                    <path d="M10.9697 2.46967C11.2626 2.17678 11.7374 2.17678 12.0303 2.46967C12.2966 2.73594 12.3208 3.1526 12.1029 3.44621L12.0303 3.53033L9.561 6L12.0303 8.46967C12.2966 8.73594 12.3208 9.1526 12.1029 9.44621L12.0303 9.53033C11.7641 9.7966 11.3474 9.8208 11.0538 9.60295L10.9697 9.53033L7.96967 6.53033C7.7034 6.26406 7.6792 5.8474 7.89705 5.55379L7.96967 5.46967L10.9697 2.46967Z"></path>
                                                </svg>
                                                {seconds > 0 && <span className="text-gray-500 text-sm">
                                                    {formatTimer}
                                                </span>}
                                            </>
                                        ) : (
                                            <Loading small={true} />
                                        )}
                                    </div>
                                </div>
                                {errorCode ? (
                                    <p className="text-red-600 text-sm mt-2">{errorCode}</p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className={`btn-dark text-[15.5px] w-full mt-7 cursor-pointer !h-[50px] ${isLoading ? "loading" : ""}`} onClick={verify}>
                                {isLoading ? <Loading /> : "تایید"}
                            </div>
                        </div>
                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={() => setIsActive(false)} />
        </Sheet>
    )
}