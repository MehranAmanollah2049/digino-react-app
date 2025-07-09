import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="w-full h-dvh flex items-center justify-center flex-col">
            <img src="/404.svg" alt="" />
            <p className="font-bold text-dark-200 mt-4">صفحه ای یافت نشد!</p>
            <span className="text-gray-500">متأسفانه صفحه ای با این آدرس یافت نشد.</span>
            <Link to={`/`} className="text-red text-[14px] flex items-center justify-center mt-3">
                بازگشت به حانه
                <svg className="size-3 fill-theme -translate-y-[0.5px]" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z" /></svg>
            </Link>
        </div>
    )
}