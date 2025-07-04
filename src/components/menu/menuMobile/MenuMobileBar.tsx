import { Link, useLocation } from "react-router";
import useUser from "../../../stores/auth/useUser";
import MenuDrawer from "./drawer/MenuDrawer";

export default function MenuMobileBar() {

    const location = useLocation();
    const { isLoggedIn, loading } = useUser();

    return (
        <div className="w-full bg-white min-[800px]:hidden h-[75px] fixed bottom-0 z-40 flex items-center justify-center border-t border-gray-200">
            <Link to="/" className={`w-1/4 h-full flex items-center justify-center flex-col gap-2 pt-1 group ${location.pathname == '/' && 'active'}`}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="size-[20px] fill-gray-500 transition-all group-[.active]:fill-theme" viewBox="0 0 24 24"
                    width="512" height="512">
                    <path
                        d="M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h3c.553,0,1-.448,1-1V15c0-.551,.448-1,1-1h4c.552,0,1,.449,1,1v8c0,.552,.447,1,1,1h3c2.757,0,5-2.243,5-5V9.724c0-1.581-.744-3.058-2-4Zm0,13.276c0,1.654-1.346,3-3,3h-2v-7c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v7h-2c-1.654,0-3-1.346-3-3V9.724c0-.999,.494-1.929,1.322-2.487L10.322,2.513c1.02-.688,2.336-.688,3.355,0l7,4.724c.828,.558,1.322,1.488,1.322,2.487v9.276Z" />
                </svg>
                <span className="text-gray-500 font-medium text-[15px] transition-all group-[.active]:text-theme">خانه</span>
            </Link>
            <MenuDrawer />
            <Link to="/cart" className={`w-1/4 h-full flex items-center justify-center flex-col gap-2 pt-1 group ${location.pathname.startsWith('/cart') && 'active'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-[21px] fill-gray-500 transition-all group-[.active]:fill-theme" viewBox="0 0 24 24" width="512"
                    height="512">
                    <path
                        d="M23.27,9.03c-.57-.66-1.4-1.03-2.27-1.03h-.09C20.41,3.51,16.59,0,11.97,0S3.52,3.51,3.02,8h-.05c-.87,0-1.7,.38-2.27,1.03C.13,9.69-.12,10.56,0,11.42l1.06,7.42c.42,2.94,2.97,5.15,5.94,5.15h9.97c2.97,0,5.52-2.21,5.94-5.15l1.06-7.42c.12-.86-.13-1.73-.7-2.39ZM11.97,2c3.52,0,6.44,2.61,6.93,6H5.04c.49-3.39,3.41-6,6.93-6Zm10.02,9.14l-1.06,7.42c-.28,1.96-1.98,3.43-3.96,3.43H7c-1.98,0-3.68-1.48-3.96-3.43l-1.06-7.42c-.04-.29,.04-.57,.23-.8,.19-.22,.46-.35,.76-.35H21c.29,0,.56,.12,.75,.34,.19,.22,.28,.51,.23,.8Z" />
                </svg>
                <span className="text-gray-500 font-medium text-[15px] transition-all group-[.active]:text-theme">سبد خرید</span>
            </Link>

            {
                loading ?
                    (
                        <div className="w-1/4 flex items-center justify-between group flex-col gap-[8px] py-2 pb-3">
                            <div className="size-[30px] rounded-full bg-gray-300 animate-pulse"></div>
                            <p className="w-[50%] rounded-full h-[8px] bg-gray-300 animate-pulse"></p>
                        </div>
                    )
                    : <Link to={`${!isLoggedIn() ? '/auth' : '/panel'}`} className="w-1/4 h-full flex items-center justify-center flex-col gap-2 pt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            className="size-[21px] transform-[scale(1.140)] text-gray-500">
                            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"
                                clipPath="url(#account_svg__a)">
                                <path
                                    d="M12 13.8c3.06 0 5.54-2.42 5.54-5.4C17.54 5.42 15.06 3 12 3S6.46 5.42 6.46 8.4c0 2.98 2.48 5.4 5.54 5.4ZM6 21c2.69-4.42 9.24-4.44 11.97-.05L18 21">
                                </path>
                            </g>
                            <defs>
                                <clipPath id="account_svg__a">
                                    <path fill="#fff" d="M0 0h24v24H0z"></path>
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="text-gray-500 font-medium text-[15px] transition-all">
                            {
                                !isLoggedIn() ? 'حساب کاربری' : 'پروفایل'
                            }
                        </span>
                    </Link>
            }

        </div>
    )
}