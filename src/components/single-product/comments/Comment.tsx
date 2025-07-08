import type { AnswerType, CommentsType } from "./CommentSection"

type Props = {
    data: CommentsType | AnswerType,
    onAnswerEvent: () => void,
    children?: React.ReactNode,
    answerMode?: boolean,
    isLast?: boolean
}

export default function Comment({ data, onAnswerEvent, children, answerMode = false, isLast = false }: Props) {
    return (
        <>
            <div className={`w-full border border-gray-200/80 rounded-lg py-4 px-5 relative ${answerMode ? 'bg-gray-100/60' : 'bg-white'}`}>
                {answerMode && <div className="absolute w-[20px] rounded-br-xl border-b-3 border-r-2 border-gray-200 h-[55px] z-2 -right-[25px] -top-3"></div>}
                {isLast && <div className="absolute w-[4px] bg-white h-[calc(100%-1.5rem)] -right-[26px] top-[2.010rem]"></div>}
                <div className="w-full flex items-center justify-between gap-2 border-b border-gray-200/70 pb-4">
                    <div className="flex items-center justify-center gap-2">
                        <div className="size-[40px] rounded-full bg-gray-300 text-white font-heavy text-[20px] border-2 border-gray-200 flex items-center justify-center">{data.user[0]}</div>
                        <div className="flex items-start justify-center flex-col">
                            <p className="text-[15px] font-bold text-title">{data.user}</p>
                            <div className="text-[14px] text-gray-400">{data.time}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        {
                            !answerMode && (
                                <div className={`px-2 h-[30px] flex items-center justify-center gap-1 rounded-lg text-[14px] font-medium ${data.score == 'پیشنهاد می کنم' && 'bg-green-100 text-green'} ${data.score == 'پیشنهاد نمی کنم' && 'bg-theme-100 text-theme'} ${data.score == 'مطمئن نیستم' && 'bg-orange-100/70 text-orange-600'}`}>
                                    {data.score == 'پیشنهاد می کنم' && (
                                        <svg fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024"
                                            className="w-5 h-5 transition-custom" height="1em" width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z">
                                            </path>
                                        </svg>
                                    )}
                                    {data.score == 'مطمئن نیستم' && (
                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                            strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-custom -mr-[1px]"
                                            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <desc></desc>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                            <line x1="19" y1="7" x2="19" y2="10"></line>
                                            <line x1="19" y1="14" x2="19" y2="14.01"></line>
                                        </svg>
                                    )}
                                    {data.score == 'پیشنهاد نمی کنم' && (
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024"
                                            className="w-5 h-5 transition-custom" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 0 0-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 0 1-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0 1 33.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0 1 19.6 43c0 19.1-11 37.5-28.8 48.4z">
                                            </path>
                                        </svg>
                                    )}
                                </div>
                            )
                        }
                        <div className="px-2 h-[30px] flex items-center justify-center gap-1 bg-gray-300/50 rounded-lg text-[14px] text-gray-600 cursor-pointer" onClick={onAnswerEvent}>
                            <svg stroke="currentColor" className="fill-gray-600 transform-[translateY(-0.3px)]" strokeWidth="0"
                                viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"></path>
                            </svg>
                            پاسخ
                        </div>
                    </div>
                </div>
                <div className="w-full text-title text-[16px]/7 pt-4 min-[650px]:text-[17px]/8" dangerouslySetInnerHTML={{ __html: data.text }}></div>
            </div >
            <div className="w-full flex items-center justify-center flex-col gap-3 pr-10 relative">
                <div className="absolute bg-gray-200 w-[2px] h-full right-4 -top-[0.75rem]"></div>
                {children}
            </div>
        </>
    )
}