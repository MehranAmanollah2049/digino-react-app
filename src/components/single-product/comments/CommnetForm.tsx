import type React from "react"
import type { FormConfigType } from "./CommentSection"
import { Sheet } from 'react-modal-sheet';
import ScoreBox from "./ScoreBox";
import BaseInput from "../../inputs/BaseInput";
import Loading from "../../Loading";
import { useEffect, useState } from "react";
import { useField } from "../../../hooks/useField";

type Props = {
    FormConfig: FormConfigType,
    setFormConfig: React.Dispatch<React.SetStateAction<FormConfigType>>,
}

export default function CommnetForm({ FormConfig, setFormConfig }: Props) {

    const { data: text, setData: setText, error: errorText, isValid: isValidText, setError: setTextError, setErrorMsg } = useField((value) => {
        return value == '' ? 'لطفا متن دیدگاه خود را وارد کنید' : null;
    }, '');
    const [score, setScore] = useState<string>('');

    const toggle_score = (value: string): void => {
        if (score == value) {
            setScore('')
        }
        else {
            setScore(value)
        }
    }

    useEffect(() => {
        setText('');
        setScore('');
        setErrorMsg('')
    }, [FormConfig.active])

    return (
        <Sheet
            isOpen={FormConfig.active}
            onClose={() => setFormConfig(prev => ({ ...prev, active: false }))}
            detent="content-height"
            tweenConfig={{
                ease: "linear",
                duration: 0.4
            }}
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <div className="w-full flex items-center justify-center pt-3 pb-5">
                        <div className="w-[92%] min-[550px]:w-[350px] flex flex-col gap-5">
                            <div className="w-full flex items-center justify-start text-theme font-bold text-[18px]">{FormConfig.title}</div>
                            {
                                FormConfig.score_status && (
                                    <div className="w-full flex items-start justify-center flex-col gap-2">
                                        <div className="w-full flex items-center justify-start text-dark-500 font-medium text-[17px]">امتیاز شما</div>
                                        <div className="w-full flex-col min-[340px]:flex-row flex items-center justify-center gap-3">
                                            <ScoreBox onSelect={() => toggle_score('پیشنهاد نمی کنم')} title="پیشنهاد نمی کنم" score={score}>
                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                                    viewBox="0 0 1024 1024" className={`size-7 transition-all ${score == "پیشنهاد نمی کنم" && 'text-dark-500'}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 0 0-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 0 1-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0 1 33.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0 1 19.6 43c0 19.1-11 37.5-28.8 48.4z">
                                                    </path>
                                                </svg>
                                            </ScoreBox>
                                            <ScoreBox onSelect={() => toggle_score('مطمئن نیستم')} title='مطمئن نیستم' score={score}>
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                                    strokeLinecap="round" strokeLinejoin="round"
                                                    className={`size-7 transition-all ${score == 'مطمئن نیستم' && 'text-dark-500'}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <desc></desc>
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <circle cx="9" cy="7" r="4"></circle>
                                                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                                    <line x1="19" y1="7" x2="19" y2="10"></line>
                                                    <line x1="19" y1="14" x2="19" y2="14.01"></line>
                                                </svg>
                                            </ScoreBox>
                                            <ScoreBox onSelect={() => toggle_score('پیشنهاد می کنم')} title='پیشنهاد می کنم' score={score}>
                                                <svg fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024"
                                                    className={`size-7 transition-all ${score == 'پیشنهاد می کنم' && 'text-dark-500'}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z">
                                                    </path>
                                                </svg>
                                            </ScoreBox>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="w-full flex items-start justify-center flex-col gap-2">
                                <div className="w-full flex items-center justify-start text-dark-500 font-medium text-[17px]">متن</div>
                                <div className="w-full flex items-center justify-center gap-3">
                                    <BaseInput isTextArea={true} error={errorText} state={text} setState={setText} title="متن دیدگاه..." />
                                </div>
                            </div>

                            <div className={`btn-dark text-[15.5px] w-full mt-2 cursor-pointer !h-[50px] ${FormConfig.loading ? "loading" : ""}`} onClick={() => FormConfig.event(text, setText,isValidText,setTextError,score, setScore)}>
                                {FormConfig.loading ? <Loading /> : "ثبت دیدگاه"}
                            </div>
                        </div>
                    </div>
                </Sheet.Content >
            </Sheet.Container >
            <Sheet.Backdrop onTap={() => setFormConfig(prev => ({ ...prev, active: false }))} />
        </Sheet >
    )
}