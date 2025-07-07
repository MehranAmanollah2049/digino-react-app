
export default function ProductBoxLoading() {
    return (
        <div className="w-full border border-gray-200/70 py-3 px-5 rounded-lg flex items-center justify-between  max-[750px]:flex-col max-[750px]:gap-2">
            <div className="w-26/40 flex items-center justify-between gap-3 max-[750px]:w-full max-[480px]:flex-col">
                <div className="size-[100px] rounded-lg bg-gray-200 animation-pluse max-[480px]:w-full mx-[480px]:h-[180px]"></div>
                <div className="w-[calc(100%-130px)] flex items-start justify-center flex-col gap-3  max-[480px]:w-full">
                    <p className="w-full h-[12px] bg-gray-200 animation-pluse rounded-full"></p>
                    <p className="w-[80%] h-[12px] bg-gray-200 animation-pluse rounded-full"></p>
                    <div className="w-full flex items-center justify-start gap-2 mt-2">
                        <div className="w-[80px] h-[10px] bg-gray-200 animation-pluse rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className="w-12/40 flex items-center justify-end gap-6 pl-3 max-[750px]:w-full  max-[750px]:gap-4">
                <div className="flex h-[50px] items-end justify-center gap-4 flex-col">
                    <div className="flex items-center justify-center gap-2 -mb-[3px]">
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