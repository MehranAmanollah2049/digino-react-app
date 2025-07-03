import { useState } from "react";
import SearchBox from "./SearchBox";

export default function SearchItem() {

    const [isActive , setIsActive] = useState<boolean>(false)

    return (
        <>
            <div onClick={() => setIsActive(prev => !prev)} className="w-[calc(100%-90px)] h-[43px] rounded-md bg-[#f2f3f5] cursor-pointer flex items-center justify-start gap-2 px-4">
                <svg className="size-[18px] transform-[translateY(-0.2px)] text-gray-400" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7.82495" cy="7.82492" r="6.74142" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M12.5137 12.8638L15.1568 15.4999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <p className="font-medium text-[16px] text-gray-400 -translate-y-[1px]">جستجو در <span className="font-morabba-regular mr-[2.5px] text-theme">دیجینو</span></p>
            </div>
            <SearchBox isActive={isActive} setIsActive={setIsActive} />
        </>
    )
}