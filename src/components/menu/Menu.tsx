import { Link } from "react-router";
import Logo from "../Logo";
import useUser from "../../stores/auth/useUser";
import BannerTitle from "./BannerTitle";
import SearchItem from "./search/SearchItem";
import toast from "react-hot-toast";
import Profile from "./profile/Profile";
import ProfileLoading from "./profile/ProfileLoading";
import LinkItem from "./LinkItem";
import DrpItem from "./DrpItem";
import DropDown from "./DropDown";
import { useCategorys } from "../../context/CategoryProvider";
import { useEffect, useRef, useState } from "react";

export default function Menu() {

  const { user, loading, logout_loading, isLoggedIn } = useUser();
  const { categorys, brands, isCategorysLoading } = useCategorys();

  const [isSubMenuActive, setIsSubMenuActive] = useState<boolean>(true)
  const lastScrollY = useRef<number>(0)

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > lastScrollY.current) {
      setIsSubMenuActive(false)
    } else if (currentScrollY < lastScrollY.current) {
      setIsSubMenuActive(true)
    }
    lastScrollY.current = currentScrollY
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cart_redirect = (): undefined => {
    if (!isLoggedIn()) {
      toast.error('ابتدا وارد حساب خود شوید')
      return;
    }
  }

  return (
    <>
      <BannerTitle />
      <nav className="w-full flex items-center justify-center flex-col bg-white border-b border-gray-200 min-[800px]:border-transparent sticky top-0 z-45">
        <div className="w-custom h-[62px] min-[800px]:h-[70px] flex items-center justify-between bg-white relative z-2">
          <div className="w-full min-[800px]:w-10/17 min-[1000px]:w-8/17 h-full flex items-center justify-start min-[800px]:gap-2">
            <Logo />
            <SearchItem />
          </div>
          <div className="w-6/17 hidden min-[800px]:flex min-[1000px]:w-7/17 h-full flex items-center justify-end gap-5">

            <div onClick={cart_redirect}
              data-count={!loading && isLoggedIn() ? user?.cart : 0}
              className="h-[43px] flex items-center justify-center relative after:content-[attr(data-count)] cursor-pointer after:px-[0.2rem] after:text-[13px] after:bg-theme after:top-1 after:-right-2 after:flex after:items-center after:justify-center after:pt-[0.1rem] after:text-white after:absolute after:w-auto after:min-w-[16px] after:h-[16px] after:rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                className="size-[24px] text-gray-800">
                <path fill="currentColor"
                  d="m3.19 15.437.851-.207-.85.207Zm0-6.182-.85-.208.85.208Zm17.445 0 .85-.208-.85.208Zm0 6.182.85.208-.85-.208Zm-5.76 5.348-.192-.854.192.854Zm-5.924 0-.193.854.193-.854Zm0-16.878.192.854-.192-.854Zm5.924 0 .192-.854-.192.854Zm-6.446 16.76.192-.853-.192.854Zm6.968 0 .192.854-.192-.854Zm0-16.642-.193.853.193-.853Zm-6.968 0-.193-.854.193.854Zm-4.254 1.61-.86.158.86-.158ZM3.47 6.65a.875.875 0 0 0 1.721-.315L3.47 6.65ZM1.327 1.727a.875.875 0 1 0-.308 1.723l.308-1.723Zm6.462 19.334c.087.188.121.4.096.608l1.738.208a2.878 2.878 0 0 0-.247-1.554l-1.587.738Zm.096.608c-.025.21-.107.404-.234.562l1.364 1.096c.334-.416.544-.92.608-1.45l-1.738-.208Zm-.234.562a1.019 1.019 0 0 1-.474.331l.549 1.662c.507-.168.954-.48 1.289-.896L7.65 22.23Zm-.474.331a.968.968 0 0 1-.56.015l-.46 1.688c.516.14 1.06.127 1.569-.041l-.549-1.662Zm-.56.015a1.011 1.011 0 0 1-.487-.305l-1.306 1.165c.356.399.818.688 1.333.828l.46-1.688Zm-.487-.305a1.1 1.1 0 0 1-.261-.547l-1.725.294c.09.527.324 1.02.68 1.418l1.306-1.165Zm-.261-.547a1.13 1.13 0 0 1 .066-.613l-1.622-.658a2.88 2.88 0 0 0-.17 1.565l1.726-.294Zm.066-.613c.078-.193.206-.354.366-.469L5.284 19.22c-.434.31-.77.74-.971 1.235l1.622.658Zm11.487-.302c.15.131.263.307.322.508l1.68-.494a2.833 2.833 0 0 0-.848-1.33l-1.154 1.316Zm.322.508c.06.202.062.417.006.62l1.687.464a2.882 2.882 0 0 0-.014-1.578l-1.678.494Zm.006.62a1.09 1.09 0 0 1-.314.515l1.178 1.294c.396-.36.68-.828.823-1.345l-1.687-.465Zm-.314.515a.997.997 0 0 1-.514.249l.274 1.728a2.748 2.748 0 0 0 1.418-.683l-1.178-1.294Zm-.514.249a.971.971 0 0 1-.557-.077l-.727 1.592a2.72 2.72 0 0 0 1.558.213l-.274-1.728Zm-.557-.077a1.036 1.036 0 0 1-.44-.386l-1.475.943c.289.452.7.812 1.188 1.035l.727-1.592Zm-.44-.386a1.117 1.117 0 0 1-.175-.589l-1.75.02c.006.536.161 1.06.45 1.512l1.474-.943Zm-.175-.589a1.12 1.12 0 0 1 .161-.593l-1.495-.91A2.87 2.87 0 0 0 14 21.67l1.75-.02ZM8.62 4.878l.522-.117-.385-1.708-.522.118.385 1.707Zm6.062-.117.521.117.385-1.707-.522-.118-.384 1.708Zm.521 15.053-.521.117.384 1.708.522-.118-.385-1.707Zm-6.061.117-.522-.117-.385 1.707.522.118.385-1.707ZM4.041 15.23a12.172 12.172 0 0 1 0-5.768l-1.7-.415a13.922 13.922 0 0 0 0 6.598l1.7-.415Zm15.744-5.768a12.171 12.171 0 0 1 0 5.768l1.7.415a13.923 13.923 0 0 0 0-6.598l-1.7.415Zm-5.102 10.47a12.586 12.586 0 0 1-5.54 0l-.385 1.707c2.079.468 4.231.468 6.31 0l-.385-1.707ZM9.143 4.76a12.587 12.587 0 0 1 5.54 0l.384-1.708a14.337 14.337 0 0 0-6.309 0l.385 1.708Zm-.522 15.053c-2.233-.504-4.015-2.27-4.58-4.584l-1.7.415c.717 2.937 2.992 5.222 5.895 5.876l.385-1.707Zm6.968 1.707c2.903-.654 5.179-2.939 5.896-5.876l-1.7-.415c-.565 2.313-2.347 4.08-4.58 4.584l.384 1.707Zm-.385-16.643c2.234.504 4.016 2.27 4.58 4.584l1.7-.415c-.716-2.937-2.992-5.221-5.895-5.876l-.385 1.707ZM8.236 3.171c-2.903.655-5.178 2.939-5.895 5.876l1.7.415c.565-2.313 2.347-4.08 4.58-4.584l-.385-1.707ZM3.7 17.124h16.426v-1.75H3.7v1.75ZM3.314 5.793l.157.856 1.721-.315-.156-.856-1.722.315ZM1.02 3.45c1.147.205 2.073 1.128 2.295 2.343l1.722-.315c-.35-1.907-1.817-3.413-3.71-3.75L1.02 3.45Z">
                </path>
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1"
                  d="m13.423 7.256.047.006c1.993.285 3.453 1.762 3.453 3.494"></path>
              </svg>
            </div>

            {/* auth */}
            {(loading || logout_loading) ? (
              <ProfileLoading />
            ) : isLoggedIn() ? (
              <Profile />
            ) : (
              <Link to="/auth" className="btn-dark gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-[16px] fill-white transform-[translateY(-0.4px)] transition-custom group-hover:fill-theme"><path d="m20.944 11h3.056v2h-24v-2h3.059c.5-4.493 4.317-8 8.941-8 1.964 0 3.832.624 5.401 1.805l-1.203 1.598c-1.22-.917-2.671-1.403-4.198-1.403-3.519 0-6.432 2.613-6.92 6h9.764c-.365-1.155-1.435-2-2.709-2-.808 0-1.583.347-2.125.952l-1.489-1.335c.921-1.027 2.238-1.617 3.614-1.617 2.384 0 4.362 1.731 4.767 4h2.018c-.101-.709-.303-1.396-.62-2.047l1.799-.875c.451.927.733 1.907.845 2.922zm-18.944 10v-4h-2v4c0 1.654 1.346 3 3 3h4v-2h-4c-.551 0-1-.449-1-1zm20 0c0 .551-.448 1-1 1h-4v2h4c1.654 0 3-1.346 3-3v-4h-2zm-1-21h-4v2h4c.552 0 1 .449 1 1v4h2v-4c0-1.654-1.346-3-3-3zm-19 3c0-.551.449-1 1-1h4v-2h-4c-1.654 0-3 1.346-3 3v4h2zm16.803 12c-.193 1.482-.559 3.116-1.209 4.755l1.841.789c.769-1.924 1.175-3.835 1.379-5.544h-2.012zm-12.209 0c-.193.574-.45 1.036-.775 1.361-.641.64-1.422.639-1.782.639h-.037l.033 2h.043c.526 0 1.961-.03 3.156-1.223.673-.672 1.149-1.607 1.438-2.777h-2.077zm6.656 4.26 1.625 1.167c1.02-1.42 1.638-3.464 1.927-5.427h-2.03c-.247 1.528-.716 3.138-1.522 4.26zm-5.005.485 1.413 1.413c1.664-1.715 2.673-3.701 3.099-6.158h-2.033c-.377 1.891-1.172 3.397-2.479 4.745z"></path></svg>
                ورود و ثبت نام
              </Link>
            )}
          </div>
        </div>
      </nav>
      <nav className={`w-full hidden min-[800px]:flex sticky top-[65px] z-44 bg-white flex items-center justify-center border-b border-gray-200 transition-all ${isSubMenuActive ? '-translate-y-0' : '-translate-y-[40px]'}`}>
        <div className="w-custom h-[50px] flex items-center justify-start gap-5">

          <DrpItem
            title="دسته بندی"
            icon={<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"
              className="size-[16px] fill-dark-500 transition-all transform-[translateY(-1px)] ml-1 group-hover/btn:fill-red">
              <rect y="11" width="24" height="2" rx="1" />
              <rect y="4" width="24" height="2" rx="1" />
              <rect y="18" width="24" height="2" rx="1" />
            </svg>}>
            <DropDown keyItem="category" list={categorys} loading={isCategorysLoading}></DropDown>
          </DrpItem>

          <DrpItem
            title="برند ها"
            icon={<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
              className="size-[16px] fill-dark-500 transition-all transform-[translateY(-1px)] group-hover/btn:fill-red">
              <path
                d="m22.576,12.52L13.849,3.85c-.842-.835-2.046-1.243-3.221-1.09l-5.803.651L1.707.293C1.316-.098.684-.098.293.293S-.098,1.316.293,1.707l3.118,3.118-.696,6.088c-.091,1.142.323,2.258,1.136,3.062l8.713,8.645c.91.906,2.118,1.404,3.4,1.404h.02c1.29-.005,2.5-.513,3.408-1.431l3.21-3.242c1.87-1.89,1.859-4.955-.025-6.832Zm-1.396,5.426l-3.21,3.242c-.531.537-1.239.834-1.994.837h-.011c-.751,0-1.458-.292-1.992-.823L5.259,12.555c-.394-.39-.594-.93-.554-1.449l.512-4.474,1.857,1.857c-.044.164-.074.334-.074.512,0,1.105.895,2,2,2s2-.895,2-2-.895-2-2-2c-.178,0-.347.031-.512.074l-1.854-1.854,4.226-.474.021-.003c.568-.075,1.151.122,1.559.525l8.726,8.668c1.105,1.102,1.112,2.899.015,4.009Zm-3.974-5.151c-.391-.391-1.023-.391-1.414,0l-3,3c-.391.391-.391,1.023,0,1.414l2.5,2.5c.195.195.451.293.707.293s.512-.098.707-.293l3-3c.391-.391.391-1.023,0-1.414l-2.5-2.5Zm-1.207,4.793l-1.086-1.086,1.586-1.586,1.086,1.086-1.586,1.586Z" />
            </svg>}>
            <DropDown keyItem="brand" list={brands} loading={isCategorysLoading}></DropDown>
          </DrpItem>

          <LinkItem title="فروشگاه" link="/products">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 fill-dark-500 -translate-y-[1px] group-hover:fill-red transition-all" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M24,10a.988.988,0,0,0-.024-.217l-1.3-5.868A4.968,4.968,0,0,0,17.792,0H6.208a4.968,4.968,0,0,0-4.88,3.915L.024,9.783A.988.988,0,0,0,0,10v1a3.984,3.984,0,0,0,1,2.643V19a5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5V13.643A3.984,3.984,0,0,0,24,11ZM2,10.109l1.28-5.76A2.982,2.982,0,0,1,6.208,2H7V5A1,1,0,0,0,9,5V2h6V5a1,1,0,0,0,2,0V2h.792A2.982,2.982,0,0,1,20.72,4.349L22,10.109V11a2,2,0,0,1-2,2H19a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-2,2H11a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-2,2H4a2,2,0,0,1-2-2ZM18,22H6a3,3,0,0,1-3-3V14.873A3.978,3.978,0,0,0,4,15H5a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,11,15h2a3.99,3.99,0,0,0,3-1.357A3.99,3.99,0,0,0,19,15h1a3.978,3.978,0,0,0,1-.127V19A3,3,0,0,1,18,22Z" /></svg>
          </LinkItem>
          <LinkItem title="ارتباط با ما" link="/" isAvilable={false}>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 fill-dark-500 -translate-y-[1px] group-hover:fill-red transition-all" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M21,12.424V11A9,9,0,0,0,3,11v1.424A5,5,0,0,0,5,22a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2V11a7,7,0,0,1,14,0v1a2,2,0,0,0-2,2v6H14a1,1,0,0,0,0,2h5a5,5,0,0,0,2-9.576ZM5,20H5a3,3,0,0,1,0-6Zm14,0V14a3,3,0,0,1,0,6Z" /></svg>
          </LinkItem>
        </div>
      </nav>
    </>
  )
}
