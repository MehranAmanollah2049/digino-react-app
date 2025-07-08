
export default function OrderCardLoading() {
    return (
        <div className="w-full rounded-lg border border-gray-200/70 bg-white p-6">
            <div className="w-full flex items-center justify-between flex-col gap-4 min-[720px]:flex-row min-[720px]:gap-0">
                <div className="flex items-center justify-start gap-2">
                    <div className="w-[50px] h-[10px] bg-gray-200 animation-pluse rounded-full"></div>
                    <div className="w-[80px] h-[10px] bg-gray-200 animation-pluse rounded-full"></div>
                </div>

                <div className="w-[50px] h-[10px] bg-gray-200 animation-pluse rounded-full"></div>
            </div>
            <div className="w-full flex items-center justify-start flex-col gap-3 my-5 min-[720px]:flex-row min-[720px]:gap-7">
                <div className="w-[80px] h-[10px] bg-gray-200 animation-pluse rounded-full"></div>
                <div className="w-[50px] h-[10px] bg-gray-200 animation-pluse rounded-full"></div>
                <div className="w-[60px] h-[10px] bg-gray-200 animation-pluse rounded-full"></div>
            </div>
            <div className="w-full bg-gray-100/60 rounded-lg p-4 flex items-center justify-start flex-wrap gap-4">
                <div className="w-[calc(100%/2-0.5rem)] h-[110px] bg-gray-200 animation-pluse rounded-lg min-[550px]:w-[calc(100%/4-0.8rem)]"></div>
                <div className="w-[calc(100%/2-0.5rem)] h-[110px] bg-gray-200 animation-pluse rounded-lg min-[550px]:w-[calc(100%/4-0.8rem)]"></div>
                <div className="w-[calc(100%/2-0.5rem)] h-[110px] bg-gray-200 animation-pluse rounded-lg min-[550px]:w-[calc(100%/4-0.8rem)]"></div>
                <div className="w-[calc(100%/2-0.5rem)] h-[110px] bg-gray-200 animation-pluse rounded-lg min-[550px]:w-[calc(100%/4-0.8rem)]"></div>
            </div>
        </div>

    )
}