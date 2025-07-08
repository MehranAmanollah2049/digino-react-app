import { Link } from "react-router"
import { BaseUrl } from "../../../api/ApiConfig"
import type { CartType } from "../../../types/ProductTypes"

export default function OrderSuccessProduct({ product }: { product: CartType }) {
    return (
        <div className="w-full border border-gray-200/70 p-3 py-4 rounded-lg flex items-center justify-between flex-col gap-2 min-[750px]:flex-row min-[750px]:gap-0">
            <Link
                to={`/products/${product.product_id}?type=${product.type_id}`}
                className="w-full flex items-center justify-start gap-3 flex-col min-[750px]:w-28/40 min-[480px]:flex-row">
                <img
                    src={BaseUrl + product.image}
                    className="w-[90%] object-contain min-[340px]:w-[200px] min-[480px]:w-[150px]"
                    alt=""
                />
                <div className="w-full flex items-start justify-center flex-col gap-3 min-[480px]:w-[calc(100%-160px)]">
                    <p className="w-full text-[18px] text-title font-bold">{product.title}</p>
                    <div className="h-[25px] text-[13px] flex items-center justify-center px-2 pt-[1px] rounded-full cursor-pointer font-medium bg-[#e9edff] text-[#4a6dff]">
                        {product.count} عدد
                    </div>
                    <div className="flex items-center justify-center gap-1 text-title text-[15px] font-bold cursor-pointer">
                        <div className="size-[28px] rounded-full border border-gray-300 p-[2px]">
                            <div
                                className="w-full h-full rounded-full flex items-center justify-center"
                                style={{ backgroundColor: product.color_code }}
                            ></div>
                        </div>
                        {product.color_title}
                    </div>
                </div>
            </Link>
            <div className="w-full flex items-end justify-center gap-1 flex-col pl-3 min-[750px]:w-11/40 min-[750px]:gap-3">
                <div className="flex h-[50px] items-end justify-center flex-col">
                    {product.discount ? (
                        <div className="flex items-center justify-center gap-[7px] -mb-[3px]">
                            <p className="text-[15.5px] text-gray-400/80 font-medium line-through transform-[translateY(0.5px)]">
                                {product.price!.toLocaleString()}
                            </p>
                            <div className="h-[20px] bg-theme rounded-[50px] px-2 pt-[0.7px] text-white flex items-center justify-center text-[13px] font-bold shadow-theme-200">
                                <span className="font-bold -mb-[1.2px]">%</span> {product.discount}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="flex items-center justify-center gap-1 text-title font-bold text-[23px]">
                        {product.payment.toLocaleString()}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 2"
                            viewBox="0 0 51.29 27.19"
                            width="51"
                            height="27"
                            className="fill-gray-400 w-5 h-5"
                        >
                            <path
                                d="M36.48 22.85c1.78-.83 2.93-1.81 3.45-2.94h-1.65c-2.53 0-4.69-.66-6.47-1.97-.59.68-1.23 1.2-1.93 1.55s-1.54.53-2.5.53c-1.03 0-1.87-.18-2.51-.53-.65-.35-1.14-.96-1.5-1.83-.35-.87-.56-2.08-.63-3.62-.02-.28-.04-.6-.04-.97s-.01-.72-.04-1.07c-.14-3.42-.28-6.26-.42-8.51l-5.8 1.37c.73 1.64 1.34 3.34 1.83 5.08.49 1.75.74 3.58.74 5.5 0 1.6-.37 3.12-1.11 4.57-.74 1.46-1.85 2.64-3.32 3.57-1.48.93-3.27 1.39-5.38 1.39s-3.82-.45-5.21-1.34C2.61 22.74 1.6 21.6.96 20.22c-.63-1.38-.95-2.84-.95-4.36 0-1.2.13-2.28.4-3.25.27-.97.63-1.93 1.07-2.87l2.39 1.34c-.38.92-.65 1.71-.83 2.39-.18.68-.26 1.48-.26 2.39 0 1.76.49 3.19 1.48 4.29s2.63 1.65 4.92 1.65c1.55 0 2.87-.32 3.96-.95 1.09-.63 1.9-1.44 2.43-2.43.53-.98.79-1.98.79-2.99 0-2.65-.82-5.82-2.46-9.5l1.69-3.52L22.38.79c.16-.05.39-.07.67-.07.54 0 .98.19 1.32.56s.53.88.58 1.51c.14 2.04.27 5.02.39 8.94.02.38.04.75.04 1.13s.01.71.04 1.02c.05 1.03.22 1.78.53 2.25s.81.7 1.51.7c.84 0 1.52-.18 2.04-.53.52-.35.97-1 1.37-1.93.75-1.71 1.33-2.96 1.74-3.75.41-.79.94-1.46 1.58-2.04.64-.57 1.44-.86 2.37-.86 1.83 0 3.27.94 4.31 2.83s1.69 4.06 1.95 6.53c1.57-.02 2.77-.13 3.61-.33.83-.2 1.41-.49 1.72-.88.32-.39.47-.89.47-1.5 0-.75-.16-1.67-.49-2.76-.33-1.09-.69-2.1-1.09-3.04l2.43-1.23c1.22 3.1 1.83 5.44 1.83 7.04 0 1.83-.67 3.18-2 4.04-1.34.87-3.53 1.34-6.58 1.41-.49 2.21-1.8 3.93-3.92 5.19-2.12 1.25-4.68 1.98-7.69 2.16l-1.2-2.88c2.6-.14 4.8-.63 6.58-1.46Z"
                                data-name="Layer 1"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    )
}