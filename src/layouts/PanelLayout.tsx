import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import useLogout from "../hooks/useLogout";
import useUser from "../stores/auth/useUser";
import Logo from "../components/Logo";
import PanelLinkItem from "../components/panel/PanelLinkItem";
import MenuMobileBar from "../components/menu/menuMobile/MenuMobileBar";

export default function PanelLayout() {
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
    const location = useLocation();
    const { isLoggedIn, user, loading: user_loading, logout_loading } = useUser();
    const { logout_handler } = useLogout()

    return (
        <div className="w-full min-h-dvh bg-gray-200/30">
            <div className="w-full flex items-center justify-center mb-[73px] min-[800px]:mb-[0px]">
                <div className="w-custom flex items-start justify-between gap-3 py-4 min-[1250px]:py-[2rem]">
                    {/* sidebar */}
                    <div className={`w-[280px] z-55 min-[1250px]:w-12/55 h-dvh min-[1250px]:h-[calc(100dvh-4rem)] fixed min-[1250px]:sticky top-0 min-[1250px]:top-[2rem] ${isMenuActive ? 'right-0' : '-right-[290px]'} transition-all bg-white min-[1250px]:rounded-xl p-5 overflow-y-custom flex items-center justify-between flex-col gap-5`}>
                        <div className="w-full flex items-center justify-start flex-col gap-5">
                            {/* user-info + logo */}
                            <div className="w-full flex items-center justify-center flex-col gap-[25px]">
                                <Logo />
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center justify-start gap-2">
                                        {
                                            !user_loading && !logout_loading ? (
                                                <div className="size-[36px] rounded-full bg-gray-300 text-white font-heavy text-[19px] border-2 border-gray-200 flex items-center justify-center">{user?.name[0]}</div>
                                            ) : (
                                                <div className="size-[36px] rounded-full bg-gray-200 animate-pulse"></div>
                                            )
                                        }
                                        <div className="flex items-start justify-center flex-col">
                                            {
                                                !user_loading && !logout_loading ? (
                                                    <>
                                                        <p className="text-dark-500 font-bold text-[15px]">{user?.name} {user?.lastname}</p>
                                                        <p className="text-gray-400 font-medium text-[14px]">{user?.phone}</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-[70px] h-[10px] rounded-full bg-gray-200 animate-pulse mb-2"></div>
                                                        <div className="w-[50px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <Link to="/panel/profile" onClick={() => setIsMenuActive(false)}
                                        className="size-[35px] flex items-center justify-center rounded-xl border border-gray-200/80">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none"
                                            className="h-5 w-5 text-dark-200">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="0.875" d="M7.779 11.38h3.72"></path>
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="0.875"
                                                d="M9.367 2.834v0a1.774 1.774 0 0 0-2.484.354L2.945 8.436c-1.015 1.352-.055 3.027-.055 3.027s1.892.435 2.892-.898L9.72 5.318a1.774 1.774 0 0 0-.354-2.484Z"
                                                clipRule="evenodd"></path>
                                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
                                                strokeWidth="0.875" d="m6.127 4.207 2.838 2.13"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            {/* links */}
                            <div className="w-full flex items-center justify-center flex-col gap-1">
                                <PanelLinkItem onClickEvent={() => setIsMenuActive(false)} title="پیشخوان" link="/panel"
                                    isActive={location.pathname == '/panel'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512"
                                        height="512" className={`size-[17px] transition-all fill-dark-200 group-[.active]:fill-theme`}>
                                        <path
                                            d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z" />
                                        <path
                                            d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z" />
                                        <path
                                            d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z" />
                                        <path
                                            d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z" />
                                    </svg>
                                </PanelLinkItem>
                                <PanelLinkItem onClickEvent={() => setIsMenuActive(false)} title="علاقه مندی ها" link="/panel/likes" isActive={location.pathname.startsWith("/panel/likes")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                                        viewBox="0 0 24 24" className={`size-[17px] transition-all fill-dark-200 group-[.active]:fill-theme`}>
                                        <path
                                            d="m24,8c0,1.064-.256,2.205-.762,3.392-.162.38-.531.609-.92.609-.131,0-.264-.026-.392-.081-.509-.216-.745-.804-.528-1.312.399-.938.602-1.815.602-2.608,0-2.71-2.061-5-4.5-5-2.235,0-3.508.905-4.366,1.694l-3.824,3.549c-.353.354-.437.949-.163,1.33.179.249.442.399.739.423.295.027.581-.081.788-.29l4.173-3.995c.396-.381,1.031-.368,1.414.031.382.399.368,1.032-.031,1.414l-1.238,1.185,4.747,4.166c1.112.976,1.386,2.615.637,3.812-.461.736-1.214,1.231-2.065,1.356-.058.008-.115.015-.173.02-.004.515-.141,1.025-.422,1.475-.461.736-1.214,1.231-2.065,1.356-.185.026-.369.037-.553.028-.054.382-.184.754-.395,1.091-.461.736-1.204,1.387-2.492,1.387-.707,0-1.393-.255-1.931-.728l-3.104-2.784C3.901,16.56,0,12.161,0,8,0,4.14,2.916,1,6.5,1c.826,0,1.633.168,2.397.5.507.22.74.809.52,1.315-.22.506-.809.738-1.315.52-.512-.222-1.051-.334-1.603-.334-2.439,0-4.5,2.29-4.5,5,0,2.674,2.313,6.237,6.515,10.034l3.094,2.774c.197.173.47.253.74.214.274-.04.509-.195.66-.438.23-.369.116-.917-.261-1.247l-3.207-3.049c-.399-.38-.416-1.012-.037-1.413.38-.4,1.012-.417,1.413-.039l3.722,3.514c.179.156.456.238.722.196.274-.04.509-.196.66-.438.23-.369.116-.917-.261-1.248l-3.56-3.223c-.408-.369-.441-1-.073-1.409.367-.409.998-.445,1.409-.079l3.742,3.33c.2.176.474.258.743.216.274-.04.509-.196.66-.438.23-.369.116-.917-.261-1.248l-4.878-4.281-1.47,1.407c-.607.608-1.464.924-2.348.854-.878-.071-1.681-.526-2.201-1.249-.845-1.174-.674-2.867.398-3.939l3.855-3.578c1.042-.957,2.764-2.225,5.723-2.225,3.584,0,6.5,3.14,6.5,7Z" />
                                    </svg>
                                </PanelLinkItem>
                                <PanelLinkItem onClickEvent={() => setIsMenuActive(false)} title="سفارشات" link="/panel/orders" isActive={location.pathname.startsWith("/panel/orders")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                                        viewBox="0 0 24 24" className={`size-[17px] transition-all fill-dark-200 group-[.active]:fill-theme`}>
                                        <path
                                            d="m10.827,13.452c.436.366.968.552,1.496.552.375,0,.747-.094,1.08-.281l9.424-4.688c.734-.426,1.173-1.188,1.173-2.037,0-.849-.439-1.609-1.229-2.065L13.448.301c-.848-.476-1.875-.381-2.621.247-.744.625-1.015,1.622-.66,2.617l1.735,3.835-1.767,3.914c-.324.916-.052,1.913.691,2.538Zm7.87-6.822l-5.162-.871-1.514-3.339c-.059-.168.018-.278.093-.342.044-.037.105-.072.188-.072.058,0,.127.017.21.062l9.31,4.625c.153.089.177.229.177.306s-.023.218-.12.276l-9.412,4.68c-.157.089-.278.029-.354-.033-.075-.063-.152-.174-.125-.263l1.547-3.418,5.161-.871c.404-.081.404-.659,0-.74Zm-8.697,16.37c0,.553-.448,1-1,1h-2c-.552,0-1-.447-1-1s.448-1,1-1h2c.552,0,1,.447,1,1Zm14-3c0,2.206-1.794,4-4,4h-7c-.552,0-1-.447-1-1s.448-1,1-1h7c1.103,0,2-.897,2-2s-.897-2-2-2H6c-3.309,0-6-2.691-6-6s2.691-6,6-6h2c.552,0,1,.447,1,1s-.448,1-1,1h-2c-2.206,0-4,1.794-4,4s1.794,4,4,4h14c2.206,0,4,1.794,4,4Zm-20,3c0,.553-.448,1-1,1H1c-.552,0-1-.447-1-1s.448-1,1-1h2c.552,0,1,.447,1,1Z" />
                                    </svg>
                                </PanelLinkItem>
                                <PanelLinkItem onClickEvent={() => setIsMenuActive(false)} title="پروفایل" link="/panel/profile" isActive={location.pathname.startsWith("/panel/profile")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1"
                                        viewBox="0 0 24 24" width="512" height="512" className={`size-[17px] transition-all fill-dark-200 group-[.active]:fill-theme`}>
                                        <path
                                            d="M9,12c3.309,0,6-2.691,6-6S12.309,0,9,0,3,2.691,3,6s2.691,6,6,6Zm0-10c2.206,0,4,1.794,4,4s-1.794,4-4,4-4-1.794-4-4,1.794-4,4-4Zm1.75,14.22c-.568-.146-1.157-.22-1.75-.22-3.86,0-7,3.14-7,7,0,.552-.448,1-1,1s-1-.448-1-1c0-4.962,4.038-9,9-9,.762,0,1.519,.095,2.25,.284,.535,.138,.856,.683,.719,1.218-.137,.535-.68,.856-1.218,.719Zm12.371-4.341c-1.134-1.134-3.11-1.134-4.243,0l-6.707,6.707c-.755,.755-1.172,1.76-1.172,2.829v1.586c0,.552,.448,1,1,1h1.586c1.069,0,2.073-.417,2.828-1.172l6.707-6.707c.567-.567,.879-1.32,.879-2.122s-.312-1.555-.878-2.121Zm-1.415,2.828l-6.708,6.707c-.377,.378-.879,.586-1.414,.586h-.586v-.586c0-.534,.208-1.036,.586-1.414l6.708-6.707c.377-.378,1.036-.378,1.414,0,.189,.188,.293,.439,.293,.707s-.104,.518-.293,.707Z" />
                                    </svg>
                                </PanelLinkItem>
                            </div>
                        </div>
                        {/* logout */}
                        <div className="w-full py-3 px-4 flex items-center justify-between rounded-xl transition-custom bg-theme-100 cursor-pointer" onClick={logout_handler}>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-[15.5px] font-medium transition-custom text-theme">خروج از حساب</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512"
                                height="512" className="size-[16px] transition-custom fill-theme">
                                <path
                                    d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
                            </svg>
                        </div>
                    </div>

                    {/* overlay */}
                    <div className={`fixed transition-all block min-[1250px]:hidden inset-0 z-54 bg-black ${isMenuActive ? 'opacity-50 visiable' : 'opacity-0 invisible'}`} onClick={() => setIsMenuActive(false)}></div>

                    {/* main content */}
                    <div className="w-full min-[1250px]:w-42/55 flex flex-col">
                        {/* mobile menu */}
                        <div className="w-full items-center justify-between py-4 px-8 bg-white rounded-xl mb-5 flex min-[1250px]:hidden">
                            <div className="center cursor-pointer" onClick={() => setIsMenuActive(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-[22px] fill-title" viewBox="0 0 24 24"
                                    width="512" height="512">
                                    <path
                                        d="M0,4c0-.55,.45-1,1-1H18c.55,0,1,.45,1,1s-.45,1-1,1H1c-.55,0-1-.45-1-1Zm18,15H1c-.55,0-1,.45-1,1s.45,1,1,1H18c.55,0,1-.45,1-1s-.45-1-1-1Zm5-8H6c-.55,0-1,.45-1,1s.45,1,1,1H23c.55,0,1-.45,1-1s-.45-1-1-1Z" />
                                </svg>
                            </div>
                            <Link to="/cart" data-count={!user_loading && isLoggedIn() ? user?.cart : 0}
                                className="h-[40px] flex items-center justify-center relative after:content-[attr(data-count)] cursor-pointer after:px-[0.2rem] after:text-[13px] after:bg-theme after:top-0 after:-right-1 after:flex after:items-center after:justify-center after:pt-[0.1rem] after:text-white after:absolute after:w-auto after:min-w-[16px] after:h-[16px] after:rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    className="h-6 w-6 text-gray-800">
                                    <path fill="currentColor"
                                        d="m3.19 15.437.851-.207-.85.207Zm0-6.182-.85-.208.85.208Zm17.445 0 .85-.208-.85.208Zm0 6.182.85.208-.85-.208Zm-5.76 5.348-.192-.854.192.854Zm-5.924 0-.193.854.193-.854Zm0-16.878.192.854-.192-.854Zm5.924 0 .192-.854-.192.854Zm-6.446 16.76.192-.853-.192.854Zm6.968 0 .192.854-.192-.854Zm0-16.642-.193.853.193-.853Zm-6.968 0-.193-.854.193.854Zm-4.254 1.61-.86.158.86-.158ZM3.47 6.65a.875.875 0 0 0 1.721-.315L3.47 6.65ZM1.327 1.727a.875.875 0 1 0-.308 1.723l.308-1.723Zm6.462 19.334c.087.188.121.4.096.608l1.738.208a2.878 2.878 0 0 0-.247-1.554l-1.587.738Zm.096.608c-.025.21-.107.404-.234.562l1.364 1.096c.334-.416.544-.92.608-1.45l-1.738-.208Zm-.234.562a1.019 1.019 0 0 1-.474.331l.549 1.662c.507-.168.954-.48 1.289-.896L7.65 22.23Zm-.474.331a.968.968 0 0 1-.56.015l-.46 1.688c.516.14 1.06.127 1.569-.041l-.549-1.662Zm-.56.015a1.011 1.011 0 0 1-.487-.305l-1.306 1.165c.356.399.818.688 1.333.828l.46-1.688Zm-.487-.305a1.1 1.1 0 0 1-.261-.547l-1.725.294c.09.527.324 1.02.68 1.418l1.306-1.165Zm-.261-.547a1.13 1.13 0 0 1 .066-.613l-1.622-.658a2.88 2.88 0 0 0-.17 1.565l1.726-.294Zm.066-.613c.078-.193.206-.354.366-.469L5.284 19.22c-.434.31-.77.74-.971 1.235l1.622.658Zm11.487-.302c.15.131.263.307.322.508l1.68-.494a2.833 2.833 0 0 0-.848-1.33l-1.154 1.316Zm.322.508c.06.202.062.417.006.62l1.687.464a2.882 2.882 0 0 0-.014-1.578l-1.678.494Zm.006.62a1.09 1.09 0 0 1-.314.515l1.178 1.294c.396-.36.68-.828.823-1.345l-1.687-.465Zm-.314.515a.997.997 0 0 1-.514.249l.274 1.728a2.748 2.748 0 0 0 1.418-.683l-1.178-1.294Zm-.514.249a.971.971 0 0 1-.557-.077l-.727 1.592a2.72 2.72 0 0 0 1.558.213l-.274-1.728Zm-.557-.077a1.036 1.036 0 0 1-.44-.386l-1.475.943c.289.452.7.812 1.188 1.035l.727-1.592Zm-.44-.386a1.117 1.117 0 0 1-.175-.589l-1.75.02c.006.536.161 1.06.45 1.512l1.474-.943Zm-.175-.589a1.12 1.12 0 0 1 .161-.593l-1.495-.91A2.87 2.87 0 0 0 14 21.67l1.75-.02ZM8.62 4.878l.522-.117-.385-1.708-.522.118.385 1.707Zm6.062-.117.521.117.385-1.707-.522-.118-.384 1.708Zm.521 15.053-.521.117.384 1.708.522-.118-.385-1.707Zm-6.061.117-.522-.117-.385 1.707.522.118.385-1.707ZM4.041 15.23a12.172 12.172 0 0 1 0-5.768l-1.7-.415a13.922 13.922 0 0 0 0 6.598l1.7-.415Zm15.744-5.768a12.171 12.171 0 0 1 0 5.768l1.7.415a13.923 13.923 0 0 0 0-6.598l-1.7.415Zm-5.102 10.47a12.586 12.586 0 0 1-5.54 0l-.385 1.707c2.079.468 4.231.468 6.31 0l-.385-1.707ZM9.143 4.76a12.587 12.587 0 0 1 5.54 0l.384-1.708a14.337 14.337 0 0 0-6.309 0l.385 1.708Zm-.522 15.053c-2.233-.504-4.015-2.27-4.58-4.584l-1.7.415c.717 2.937 2.992 5.222 5.895 5.876l.385-1.707Zm6.968 1.707c2.903-.654 5.179-2.939 5.896-5.876l-1.7-.415c-.565 2.313-2.347 4.08-4.58 4.584l.384 1.707Zm-.385-16.643c2.234.504 4.016 2.27 4.58 4.584l1.7-.415c-.716-2.937-2.992-5.221-5.895-5.876l-.385 1.707ZM8.236 3.171c-2.903.655-5.178 2.939-5.895 5.876l1.7.415c.565-2.313 2.347-4.08 4.58-4.584l-.385-1.707ZM3.7 17.124h16.426v-1.75H3.7v1.75ZM3.314 5.793l.157.856 1.721-.315-.156-.856-1.722.315ZM1.02 3.45c1.147.205 2.073 1.128 2.295 2.343l1.722-.315c-.35-1.907-1.817-3.413-3.71-3.75L1.02 3.45Z">
                                    </path>
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1"
                                        d="m13.423 7.256.047.006c1.993.285 3.453 1.762 3.453 3.494"></path>
                                </svg>
                            </Link>
                        </div>

                        <Outlet />
                    </div>
                </div>
            </div>
            <MenuMobileBar />
        </div>
    );
}
