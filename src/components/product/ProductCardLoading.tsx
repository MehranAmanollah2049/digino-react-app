

export default function ProductCardLoading() {
    return (
        <div className="w-[250px] min-[1300px]:w-full min-[1300px]:w-auto h-[315px] min-[470px]:h-[390px] flex items-start justify-center flex-col gap-3 border-4 border-white px-1">
            <div className="w-full h-[145px] rounded-lg bg-gray-200 animate-pulse min-[470px]:h-[220px]"></div>
            <div className="w-full h-[10px] rounded-full bg-gray-200 animate-pulse mt-2"></div>
            <div className="w-[50%] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>

            <div className="w-full flex items-center justify-between py-4">
                <div className="w-[80px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-[50px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
            </div>

            <div className="w-full flex items-end justify-center gap-3 flex-col">
                <div className="w-[60px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-[100px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
            </div>
        </div>
    )
}