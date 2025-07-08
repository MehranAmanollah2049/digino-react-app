import { useEffect, useState } from "react"
import ProductBoxLoading from "../../components/cart/ProductBoxLoading"
import type { ProductCardType } from "../../types/ProductTypes";
import DataBox from "../../components/panel/DataBox";
import HttpRequest from "../../api/ApiConfig";
import Nprogress from 'nprogress'
import OrderCardLoading from "../../components/panel/order/OrderCardLoading";
import OrderCard from "../../components/panel/order/OrderCard";
import ProductLikeBox from "../../components/panel/likes/ProductLikeBox";
import type { OrderType } from "../../types/OrderTypes";

export default function Dashboard() {

    // states
    const [BoxLoading, setBoxLoading] = useState<boolean>(true);
    const [BoxData, setBoxData] = useState<[number, number, number, number]>([0, 0, 0, 0])

    const [isLikeProductLoading, setIsLikeProductLoading] = useState<boolean>(true);
    const [ProductLikes, setProductLikes] = useState<ProductCardType[]>([])

    const [isOrderLoading, setIsOrderLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<OrderType[]>([])

    // actions
    const get_data = async () => {
        await HttpRequest.get('/panel/data')
            .then(res => {
                setBoxLoading(false)

                if (res) {
                    setBoxData(res.data.data)
                }
            })
            .catch(() => {
                setBoxLoading(false)
            })
    }

    const get_like_product = async () => {
        await HttpRequest.get('/panel/likes?limit=1')
            .then(res => {
                setIsLikeProductLoading(false)

                if (res) {
                    setProductLikes(res.data.data)
                }
            })
            .catch(() => {
                setIsLikeProductLoading(false)
            })
    }

    const get_last_order = async () => {
        await HttpRequest.get('/panel/orders?limit=2')
            .then(res => {
                setIsOrderLoading(false)

                if (res) {
                    setOrders(res.data.data)
                }
            })
            .catch(() => {
                setIsOrderLoading(false)
            })
    }

    const decrease_like_count = async () => {
        await get_like_product()

        setBoxData(prev => {
            const updated: [number, number, number, number] = [...prev];
            updated[2] = updated[2] - 1;
            return updated;
        });
    }


    useEffect(() => {
        const loadData = async () => {
            Nprogress.start();
            await Promise.all([
                get_data(),
                get_like_product(),
                get_last_order()
            ]);
            Nprogress.done();
        };

        loadData();
    }, []);



    return (
        <>
            <div className="w-full px-5 py-5 bg-white rounded-xl min-[500px]:px-8 min-[500px]:py-6">
                <div className="w-full flex items-center justify-start gap-y-7 min-[360px]:gap-y-5 pt-3 flex-wrap">
                    <DataBox loading={BoxLoading} title="سفارشات موفق" count={BoxData[0]} theme="success"></DataBox>
                    <DataBox loading={BoxLoading} title="سفارشات ناموفق" count={BoxData[1]} theme="error"></DataBox>
                    <DataBox loading={BoxLoading} title="علاقه مندی ها" count={BoxData[2]} theme="orange"></DataBox>
                    <DataBox loading={BoxLoading} title="سبد خرید" count={BoxData[3]} ></DataBox>
                </div >

                <div className="w-full flex items-center justify-center flex-col">
                    <div className="w-full flex items-center justify-center h-[1px] bg-gray-200/70 my-10 mb-7">
                        <span className="px-4 bg-white text-title text-[15px] font-medium">اخرین علاقه مندی ها </span>
                    </div>
                    <div className="w-full flex items-center justify-center flex-col gap-3">
                        {
                            isLikeProductLoading ? <ProductBoxLoading /> : ProductLikes.length > 0 ? ProductLikes.map(product => (<ProductLikeBox key={product.id} product={product} likeTracker={decrease_like_count} />)) : (
                                <div className="w-full flex items-center justify-center flex-col gap-3 font-bold text-gray-600 py-3">
                                    <img src="/favorites-list-empty.svg" alt="" />
                                    <span>موردی یافت نشد</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="w-full pt-8 bg-white rounded-xl mt-5 py-5 px-5 min-[500px]:py-6 min-[500px]:px-8">
                <div className="w-full flex items-center justify-start">
                    <p className="font-heavy text-[18px] min-[500px]:text-[21px] text-theme pr-5 flex items-center justify-center relative after:size-2 after:rounded-full after:bg-theme after:absolute after:content-[''] after:transform-[translateY(-0.5px)] after:right-0">آخرین سفارشات</p>
                </div>
                <div className="w-full flex items-center justify-center flex-col gap-3 mt-5">
                    {
                        isOrderLoading ? (
                            <>
                            <OrderCardLoading />
                            <OrderCardLoading />
                            </>
                        ) : orders.length > 0 ? orders.map(order => (<OrderCard key={order.id} order={order} />)) : (
                            <div className="w-full flex items-center justify-center flex-col gap-3 font-bold text-gray-600 py-3">
                                <img src="/order-empty.svg" alt="" />
                                <span>موردی یافت نشد</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}