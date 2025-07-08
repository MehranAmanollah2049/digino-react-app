
export default function ProductBoxLoading() {
    return (
        <div className="w-full border border-gray-200/70 py-3 px-5 rounded-lg flex flex-col gap-2 min-[750px]:flex-row min-[750px]:items-center min-[750px]:justify-between">
            <div className="w-full flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-3 min-[750px]:w-26/40">
                <div className="w-full h-[150px] rounded-lg bg-gray-200 animation-pluse min-[480px]:size-[100px] min-[750px]:w-[250px] min-[750px]:h-[120px]"></div>
                <div className="w-full flex flex-col gap-3">
                    <p className="w-full h-[12px] bg-gray-200 animation-pluse rounded-full"></p>
                    <p className="w-[80%] h-[12px] bg-gray-200 animation-pluse rounded-full"></p>
                    <div className="w-full flex items-center gap-2 mt-2">
                        <div className="w-[80px] h-[10px] bg-gray-200 animation-pluse rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 pl-3 min-[750px]:w-12/40 min-[750px]:flex-row min-[750px]:items-center min-[750px]:justify-end min-[750px]:gap-6">
                <div className="flex flex-col gap-4 h-[50px] justify-center items-end min-[750px]:items-center min-[750px]:justify-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <p className="w-[50px] h-[10px] bg-gray-200 rounded-full animation-pluse"></p>
                        <div className="w-[32px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                    </div>
                    <div className="w-[90px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                </div>
                <div className="w-[50px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
            </div>
        </div>

    )
}