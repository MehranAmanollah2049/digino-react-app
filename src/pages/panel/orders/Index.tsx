import { useEffect, useState } from "react";
import type { OrderType } from "../../../types/OrderTypes";
import Nprogress from 'nprogress'
import HttpRequest from "../../../api/ApiConfig";
import OrderCardLoading from "../../../components/panel/order/OrderCardLoading";
import OrderCard from "../../../components/panel/order/OrderCard";

export default function Index() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [items, setItems] = useState<OrderType[]>([]);

    const get_data = async () => {
        Nprogress.start()
        await HttpRequest.get('/panel/orders')
            .then(res => {
                setIsLoading(false);
                Nprogress.done()

                if (res) {
                    setItems(res.data.data)
                }
            })
            .catch(() => {
                setIsLoading(false);
                Nprogress.done()
            })
    }

    useEffect(() => {
        get_data()
    }, [])

    return (
        <div className="w-full py-6 bg-white rounded-xl px-6 min-[500px]:px-8 min-[500px]:py-6">
            <div className="w-full flex items-center justify-start">
                <p className="font-heavy text-[18px] min-[500px]:text-[25px] text-theme pr-5 flex items-center justify-center relative after:size-2 after:rounded-full after:bg-theme after:absolute after:content-[''] after:transform-[translateY(-0.5px)] after:right-0">سفارشات</p>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-2 mt-5">
                {
                    isLoading ? (
                        <>
                            <OrderCardLoading />
                            <OrderCardLoading />
                            <OrderCardLoading />
                        </>
                    ) : items.length > 0 ? items.map(order => (<OrderCard key={order.id} order={order} />)) : (
                        <div className="w-full flex items-center justify-center flex-col gap-3 font-bold text-gray-600 py-3">
                            <img src="/order-empty.svg" alt="" />
                            <span>موردی یافت نشد</span>
                        </div>
                    )

                }
            </div>
        </div>
    )
}