
export default function CommentLoading() {
    return (
        <div className="w-full border border-gray-200/80 rounded-lg py-4 px-5">
            <div className="w-full flex items-center justify-between gap-2 border-b border-gray-200/70 pb-4">
                <div className="flex items-center justify-center gap-2">
                    <div className="size-[40px] rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="flex items-start justify-center flex-col gap-2">
                        <div className="w-[80px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="w-[50px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="w-[50px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-[70px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                </div>
            </div>
            <div className="w-full flex items-start justify-center flex-col gap-3 pt-4">
                <div className="w-full h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-full h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-[40%] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
            </div>
        </div>
    )
}