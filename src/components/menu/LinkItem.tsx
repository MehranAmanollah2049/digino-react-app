import type React from "react"
import toast from "react-hot-toast"
import { Link } from "react-router"

type Props = {
    title: string,
    link: string,
    children: React.ReactNode,
    isAvilable?: boolean
}

export default function LinkItem({ title, link, children, isAvilable = true }: Props) {
    return (
        <>
            {
                isAvilable ? 
                (<Link to={link} className="w-auto h-full flex items-center justify-center gap-2 text-dark-500 transition-all hover:text-red text-[15px] font-medium cursor-pointer relative group">
                    {children}
                    {title}

                    <div className="w-full h-[1.5px] absolute bottom-0 bg-red rounded-t-full opacity-0 transition-all group-hover:opacity-100"></div>
                </Link >) 
                : <div onClick={() => toast.error("این بخش هنوز راه اندازی نشده")} className="w-auto h-full flex items-center justify-center gap-2 text-dark-500 transition-all hover:text-red text-[15px] font-medium cursor-pointer relative group">
                    {children}
                    {title}

                    <div className="w-full h-[1.5px] absolute bottom-0 bg-red rounded-t-full opacity-0 transition-all group-hover:opacity-100"></div>
                </div >
            }
        </>
    )
}