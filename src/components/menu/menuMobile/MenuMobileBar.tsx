import { Link, useLocation, useNavigate } from "react-router";
import useUser from "../../../stores/auth/useUser";
import MenuDrawer from "./drawer/MenuDrawer";
import toast from "react-hot-toast";

export default function MenuMobileBar() {

    const navigate = useNavigate()
    const location = useLocation();
    const { isLoggedIn, loading } = useUser();

    const cart_redirect = (): undefined => {
        if (!isLoggedIn()) {
            toast.error('ابتدا وارد حساب خود شوید')
            return;
        }

        navigate('/cart')
    }

    return (
        <div className="w-full bg-white min-[800px]:hidden h-[75px] fixed bottom-0 z-40 flex items-center justify-center border-t border-gray-200">
            <Link to="/" className={`w-1/4 h-full relative flex items-center justify-center flex-col gap-2 pt-1 group ${location.pathname == '/' && 'active'}`}>
                <div className="w-[30px] h-1 bg-theme rounded-b-lg absolute top-0 transition-all opacity-0 group-[.active]:opacity-100"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="size-[25px] -mb-[4px] text-gray-500 block transition-all group-[.active]:hidden"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.364 12.958c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093z" /><path strokeLinecap="round" d="M15 18H9" /></g></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="size-[25px] -mb-[4px] text-theme hidden transition-all group-[.active]:block"><path fill="currentColor" fillRule="evenodd" d="M13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093l-.279-1.937c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22m-4.708-6.447a.75.75 0 0 1 1.049-.156c.728.54 1.607.853 2.553.853s1.825-.313 2.553-.853a.75.75 0 1 1 .894 1.205A5.77 5.77 0 0 1 12 17.75a5.77 5.77 0 0 1-3.447-1.148a.75.75 0 0 1-.155-1.049" clipRule="evenodd" /></svg>
                <span className="text-gray-500 font-medium text-[15px] transition-all group-[.active]:text-theme">خانه</span>
            </Link>
            <MenuDrawer />
            <div onClick={cart_redirect} className={`w-1/4 h-full cursor-pointer relative flex items-center justify-center flex-col gap-2 pt-1 group ${location.pathname.startsWith('/cart') && 'active'}`}>
                <div className="w-[30px] h-1 bg-theme rounded-b-lg absolute top-0 transition-all opacity-0 group-[.active]:opacity-100"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="size-[27px] -mb-[5px] text-gray-500 block transition-all group-[.active]:hidden"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.555 14.257c-.718-3.353-1.078-5.03-.177-6.143C4.278 7 5.993 7 9.422 7h5.156c3.43 0 5.143 0 6.044 1.114c.9 1.114.541 2.79-.177 6.143l-.429 2c-.487 2.273-.73 3.409-1.555 4.076c-.825.667-1.987.667-4.311.667h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076l-.429-2Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 11h18m-11 3h4m4-5l-3-6M6 9l3-6" /></g></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="size-[27px] -mb-[5px] text-theme hidden transition-all group-[.active]:block"><path fill="currentColor" d="M14.665 2.33a.75.75 0 0 1 1.006.335l2.201 4.402c1.353.104 2.202.37 2.75 1.047c.436.539.576 1.209.525 2.136H2.853c-.051-.927.09-1.597.525-2.136c.548-.678 1.397-.943 2.75-1.047l2.201-4.402a.75.75 0 0 1 1.342.67l-1.835 3.67Q8.559 7 9.422 7h5.156q.863-.001 1.586.005l-1.835-3.67a.75.75 0 0 1 .336-1.006" /><path fill="currentColor" fillRule="evenodd" d="M3.555 14.257a74 74 0 0 1-.51-2.507h17.91a74 74 0 0 1-.51 2.507l-.429 2c-.487 2.273-.73 3.409-1.555 4.076S16.474 21 14.15 21h-4.3c-2.324 0-3.486 0-4.31-.667c-.826-.667-1.07-1.803-1.556-4.076zM10 13.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z" clipRule="evenodd" /></svg>
                <span className="text-gray-500 font-medium text-[15px] transition-all group-[.active]:text-theme">سبد خرید</span>
            </div>

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