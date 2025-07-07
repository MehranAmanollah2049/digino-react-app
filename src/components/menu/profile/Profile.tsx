import { useState } from "react"
import { Link } from "react-router"
import useLogout from "../../../hooks/useLogout"

export default function Profile() {

    const [isActive, setIsActive] = useState<boolean>(false)
    const { logout_handler } = useLogout()

    return (
        <>
            <div className={`flex items-center justify-center h-[43px] cursor-pointer relative ${isActive && 'z-104'}`} onClick={() => setIsActive(prev => !prev)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="size-[26px] text-gray-800"><g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" clipPath="url(#account_svg__a)"><path d="M12 13.8c3.06 0 5.54-2.42 5.54-5.4C17.54 5.42 15.06 3 12 3S6.46 5.42 6.46 8.4c0 2.98 2.48 5.4 5.54 5.4ZM6 21c2.69-4.42 9.24-4.44 11.97-.05L18 21"></path></g><defs><clipPath id="account_svg__a"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="text-secondary-700 size-4 transform-[translateY(0.5px)]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

                <div className={`w-auto min-w-[170px] bg-white shadow-custom rounded-lg absolute p-2 left-0 top-[calc(100%+8px)] z-2 flex items-center justify-center flex-col gap-[2px] ${isActive ? 'opacity-100 visible transform-[scale(1)]' : 'opacity-0 invisible  transform-[scale(0.88)]'} transition-all origin-top-left`}>
                    <Link to="/panel"
                        className="w-full py-[6px] px-3 rounded-md flex items-center justify-start gap-2 transition-all hover:bg-gray-100 text-title text-[15.5px]">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="fill-dark-500 w-[15px] h-[16px] transform-[translateY(-1.5px)]" viewBox="0 0 24 24" width="512"
                            height="512">
                            <path
                                d="M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h3c.553,0,1-.448,1-1V15c0-.551,.448-1,1-1h4c.552,0,1,.449,1,1v8c0,.552,.447,1,1,1h3c2.757,0,5-2.243,5-5V9.724c0-1.581-.744-3.058-2-4Zm0,13.276c0,1.654-1.346,3-3,3h-2v-7c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v7h-2c-1.654,0-3-1.346-3-3V9.724c0-.999,.494-1.929,1.322-2.487L10.322,2.513c1.02-.688,2.336-.688,3.355,0l7,4.724c.828,.558,1.322,1.488,1.322,2.487v9.276Z" />
                        </svg>
                        داشبورد
                    </Link>
                    <Link to="/panel/orders"
                        className="w-full py-[6px] px-3 rounded-md flex items-center justify-start gap-2 transition-all hover:bg-gray-100 text-title text-[15.5px]">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                            className="fill-dark-500 w-[15px] h-[16px] transform-[translateY(-1.5px)]">
                            <path
                                d="m10.827,13.452c.436.366.968.552,1.496.552.375,0,.747-.094,1.08-.281l9.424-4.688c.734-.426,1.173-1.188,1.173-2.037,0-.849-.439-1.609-1.229-2.065L13.448.301c-.848-.476-1.875-.381-2.621.247-.744.625-1.015,1.622-.66,2.617l1.735,3.835-1.767,3.914c-.324.916-.052,1.913.691,2.538Zm7.87-6.822l-5.162-.871-1.514-3.339c-.059-.168.018-.278.093-.342.044-.037.105-.072.188-.072.058,0,.127.017.21.062l9.31,4.625c.153.089.177.229.177.306s-.023.218-.12.276l-9.412,4.68c-.157.089-.278.029-.354-.033-.075-.063-.152-.174-.125-.263l1.547-3.418,5.161-.871c.404-.081.404-.659,0-.74Zm-8.697,16.37c0,.553-.448,1-1,1h-2c-.552,0-1-.447-1-1s.448-1,1-1h2c.552,0,1,.447,1,1Zm14-3c0,2.206-1.794,4-4,4h-7c-.552,0-1-.447-1-1s.448-1,1-1h7c1.103,0,2-.897,2-2s-.897-2-2-2H6c-3.309,0-6-2.691-6-6s2.691-6,6-6h2c.552,0,1,.447,1,1s-.448,1-1,1h-2c-2.206,0-4,1.794-4,4s1.794,4,4,4h14c2.206,0,4,1.794,4,4Zm-20,3c0,.553-.448,1-1,1H1c-.552,0-1-.447-1-1s.448-1,1-1h2c.552,0,1,.447,1,1Z" />
                        </svg>
                        سفارشات
                    </Link>
                    <div onClick={logout_handler} className="w-full py-[6px] px-3 rounded-md flex items-center justify-start gap-2 transition-all hover:bg-red-100 text-red text-[15px]">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="512" height="512" x="0" y="0" viewBox="0 0 24 24" xmlSpace="preserve"
                            className="fill-red w-[14px] h-[15px] transform-[translateY(-0.5px)]">
                            <g>
                                <path
                                    d="M11.476 15a1 1 0 0 0-1 1v3a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h2.476a3 3 0 0 1 3 3v3a1 1 0 0 0 2 0V5a5.006 5.006 0 0 0-5-5H5a5.006 5.006 0 0 0-5 5v14a5.006 5.006 0 0 0 5 5h2.476a5.006 5.006 0 0 0 5-5v-3a1 1 0 0 0-1-1Z"
                                    opacity="1" data-original="#000000"></path>
                                <path
                                    d="m22.867 9.879-4.586-4.586a1 1 0 1 0-1.414 1.414l4.262 4.263L6 11a1 1 0 0 0 0 2l15.188-.031-4.323 4.324a1 1 0 1 0 1.414 1.414l4.586-4.586a3 3 0 0 0 .002-4.242Z"
                                    opacity="1" data-original="#000000"></path>
                            </g>
                        </svg>
                        خروج از حساب
                    </div>
                </div>
            </div>

            <div className={`fixed inset-0 ${isActive ? 'z-103' : 'hidden'}`} onClick={() => setIsActive(false)}></div>
        </>
    )
}