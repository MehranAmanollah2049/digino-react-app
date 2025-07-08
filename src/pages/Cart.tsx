import { useEffect, useState } from "react"
import ProductBoxLoading from "../components/cart/ProductBoxLoading"
import Loading from "../components/Loading"
import HttpRequest from "../api/ApiConfig"
import Nprogress from 'nprogress'
import type { CartType } from "../types/ProductTypes"
import useCartCalculator from "../hooks/useCartCalculator"
import CartProduct from "../components/cart/CartProduct"
import toast from "react-hot-toast"


export default function Cart() {

    // states
    const [Products, setProducts] = useState<CartType[]>([])
    const [isProductLoading, setIsProductLoading] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // actions
    const fetch_data = async (): Promise<void> => {
        Nprogress.start()
        await HttpRequest.get(`/cart`)
            .then(res => {

                Nprogress.done()
                setIsProductLoading(false)
                setProducts(res.data.data)
            })
            .catch(() => {
                Nprogress.done()
                setIsProductLoading(false)
            })
    }

    const DeleteCart = (id: number): void => {
        setProducts(prev => prev.filter(item => Number(item.id) != id))
    }

    const ChangeProductCount = (id: number, newCount: number): void => {
        setProducts(prev => (prev.map(cart => {
            if (cart.id == id) {
                cart.count = newCount
            }

            return cart;
        })))
    }

    const payment = () => {
        if (!isLoading) {
            setIsLoading(true)
            Nprogress.start()

            HttpRequest.post('/payment')
                .then(res => {
                    Nprogress.done()

                    if (res) {
                        toast.loading("در حال انتقال به درگاه")
                        window.location.href = res.data.action
                    } else {
                        setIsLoading(false)
                    }
                })
                .catch(() => {
                    setIsLoading(false)
                    Nprogress.done()
                })
        }
    }


    useEffect(() => {
        fetch_data()
    }, [])

    // propertys
    const { available_carts, total_price, total_discount, total_payment } = useCartCalculator(Products)

    return (
        <div className="w-full flex items-center justify-center py-7 min-[600px]:py-10">
            <div className="w-custom flex items-center justify-center flex-col gap-6 min-[1350px]:px-10">
                <p className="w-full font-heavy text-title text-[23.5px] min-[600px]:text-[25px]">سبد خرید</p>

                {Products.length > 0 || isProductLoading ? (
                    <div className="w-full flex flex-col gap-3 min-[1150px]:flex-row min-[1150px]:items-start min-[1150px]:justify-between">
                        <div className="w-full flex flex-col items-center justify-center gap-3 min-[1150px]:w-28/38">
                            {!isProductLoading ? (
                                Products.map((cart) => (
                                    <CartProduct
                                        request={`cart/${cart.id}`}
                                        key={cart.id}
                                        product={cart}
                                        onDeleteCart={DeleteCart}
                                        onChangeProductCount={ChangeProductCount}
                                        isAvailable={!!available_carts.find((item) => item.id == cart.id)}
                                    />
                                ))
                            ) : (
                                <>
                                    <ProductBoxLoading />
                                    <ProductBoxLoading />
                                    <ProductBoxLoading />
                                </>
                            )}
                        </div>

                        <div className="w-full p-6 pb-5 rounded-lg border border-gray-200/70 sticky top-0 min-[1150px]:w-9/38 min-[1150px]:relative min-[1150px]:top-auto">
                            <div className="w-full flex items-center gap-2 text-title text-[17px] font-heavy pb-4 border-b border-gray-200/70">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="h-5 w-5 text-title translate-y-[-1.5px]"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M18.333 5v2.017c0 1.316-.833 2.15-2.15 2.15h-2.85V3.342c0-.925.759-1.675 1.684-1.675a3.35 3.35 0 0 1 2.341.975c.6.608.975 1.441.975 2.358Z"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        d="M1.667 5.833V17.5A.83.83 0 0 0 3 18.167L4.425 17.1a.84.84 0 0 1 1.1.083l1.383 1.392a.84.84 0 0 0 1.184 0l1.4-1.4a.826.826 0 0 1 1.083-.075L12 18.167a.835.835 0 0 0 1.333-.667V3.333c0-.916.75-1.666 1.667-1.666H5C2.5 1.667 1.667 3.158 1.667 5v.833Z"
                                        opacity="0.4"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        d="M10 8.125H5a.63.63 0 0 1-.625-.625A.63.63 0 0 1 5 6.875h5a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Zm-.625 3.333h-3.75A.63.63 0 0 1 5 10.833a.63.63 0 0 1 .625-.625h3.75a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z"
                                    ></path>
                                </svg>
                                اطلاعات پرداخت
                            </div>

                            <div className="w-full flex flex-col items-center justify-center py-3 border-b border-gray-200/70">
                                <div className="w-full flex items-center justify-between">
                                    <p className="text-[#555775] font-bold text-[17px]">جمع کل</p>
                                    <span className="text-[#6a6c87] text-[19px] font-bold">
                                        {total_price.toLocaleString()}
                                    </span>
                                </div>
                                <div className="w-full flex items-center justify-between">
                                    <p className="text-[#555775] font-bold text-[17px]">تخفیف</p>
                                    <span className="text-theme text-[19px] font-bold">
                                        {total_discount.toLocaleString()} -
                                    </span>
                                </div>
                            </div>

                            <div className="w-full flex flex-col items-center justify-center gap-3 pt-3">
                                <div className="w-full flex items-center justify-between">
                                    <p className="text-[#555775] font-bold text-[17px]">
                                        قابل پرداخت
                                    </p>
                                    <span className="text-title text-[23px] font-heavy flex items-center gap-1">
                                        {total_payment.toLocaleString()}
                                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 51.29 27.19" width="51" height="27" className="size-[18px] fill-gray-400"><path d="M36.48 22.85c1.78-.83 2.93-1.81 3.45-2.94h-1.65c-2.53 0-4.69-.66-6.47-1.97-.59.68-1.23 1.2-1.93 1.55s-1.54.53-2.5.53c-1.03 0-1.87-.18-2.51-.53-.65-.35-1.14-.96-1.5-1.83-.35-.87-.56-2.08-.63-3.62-.02-.28-.04-.6-.04-.97s-.01-.72-.04-1.07c-.14-3.42-.28-6.26-.42-8.51l-5.8 1.37c.73 1.64 1.34 3.34 1.83 5.08.49 1.75.74 3.58.74 5.5 0 1.6-.37 3.12-1.11 4.57-.74 1.46-1.85 2.64-3.32 3.57-1.48.93-3.27 1.39-5.38 1.39s-3.82-.45-5.21-1.34C2.61 22.74 1.6 21.6.96 20.22c-.63-1.38-.95-2.84-.95-4.36 0-1.2.13-2.28.4-3.25.27-.97.63-1.93 1.07-2.87l2.39 1.34c-.38.92-.65 1.71-.83 2.39-.18.68-.26 1.48-.26 2.39 0 1.76.49 3.19 1.48 4.29s2.63 1.65 4.92 1.65c1.55 0 2.87-.32 3.96-.95 1.09-.63 1.9-1.44 2.43-2.43.53-.98.79-1.98.79-2.99 0-2.65-.82-5.82-2.46-9.5l1.69-3.52L22.38.79c.16-.05.39-.07.67-.07.54 0 .98.19 1.32.56s.53.88.58 1.51c.14 2.04.27 5.02.39 8.94.02.38.04.75.04 1.13s.01.71.04 1.02c.05 1.03.22 1.78.53 2.25s.81.7 1.51.7c.84 0 1.52-.18 2.04-.53.52-.35.97-1 1.37-1.93.75-1.71 1.33-2.96 1.74-3.75.41-.79.94-1.46 1.58-2.04.64-.57 1.44-.86 2.37-.86 1.83 0 3.27.94 4.31 2.83s1.69 4.06 1.95 6.53c1.57-.02 2.77-.13 3.61-.33.83-.2 1.41-.49 1.72-.88.32-.39.47-.89.47-1.5 0-.75-.16-1.67-.49-2.76-.33-1.09-.69-2.1-1.09-3.04l2.43-1.23c1.22 3.1 1.83 5.44 1.83 7.04 0 1.83-.67 3.18-2 4.04-1.34.87-3.53 1.34-6.58 1.41-.49 2.21-1.8 3.93-3.92 5.19-2.12 1.25-4.68 1.98-7.69 2.16l-1.2-2.88c2.6-.14 4.8-.63 6.58-1.46ZM10.38 5.66l.11 3.31-3.2.28-.46-3.31 3.55-.28Zm25.1 10.83c.88.28 1.81.42 2.8.42h1.93c-.16-1.67-.55-3.08-1.16-4.26-.61-1.17-1.38-1.76-2.32-1.76-.75 0-1.42.45-2.02 1.34-.6.89-1.11 1.92-1.53 3.1.66.49 1.42.88 2.3 1.16ZM43.64.21C45.06.07 46.43 0 47.74 0c.96 0 1.67.02 2.11.07l-.21 2.81c-.42-.05-1.08-.07-1.97-.07-1.2 0-2.44.07-3.73.21s-2.44.32-3.45.53L39.86.81c1.1-.26 2.36-.46 3.78-.6Z" data-name="Layer 1"></path></svg>
                                    </span>
                                </div>
                                <div
                                    className={`btn-dark transition-custom w-full h-[45px] rounded-lg text-[15px] font-bold ${isLoading && "loading"
                                        }`}
                                    onClick={payment}
                                >
                                    {isLoading ? <Loading /> : "پرداخت سفارش"}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full min-h-[calc(100vh-385px)] flex flex-col items-center justify-center gap-2 font-bold text-gray-600">
                        <img src="/empty-cart.svg" alt="" />
                        موردی یافت نشده
                    </div>
                )}
            </div>
        </div>

    )
}