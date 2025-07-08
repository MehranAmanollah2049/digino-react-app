import { useEffect, useState } from "react"
import { Status } from "../../../types/OrderTypes"
import Loading from "../../../components/Loading";
import ProductBoxLoading from "../../../components/cart/ProductBoxLoading";
import { useNavigate, useParams } from "react-router";
import HttpRequest from "../../../api/ApiConfig";
import Nprogress from 'nprogress'
import useCartCalculator from "../../../hooks/useCartCalculator";
import OrderSuccessProduct from "../../../components/panel/order/OrderSuccessProduct";
import type { CartType } from "../../../types/ProductTypes";
import CartProduct from "../../../components/cart/CartProduct";
import toast from "react-hot-toast";

interface OrderType {
    id: number,
    full_name: string,
    phone: string,
    code: string,
    status: Status,
    driver: string,
    created_at: string | number,
    products: CartType[]
}

export default function Single() {

    const params = useParams();
    const navigate = useNavigate()

    // states
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<OrderType>({
        id: 0,
        full_name: '',
        phone: '',
        code: '',
        status: Status.FAIL,
        driver: '',
        created_at: '',
        products: []
    });
    const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);

    // actions
    const get_data = async () => {
        Nprogress.start()
        await HttpRequest(`/panel/orders/${params.id}`)
            .then(res => {
                setIsLoading(false);
                Nprogress.done()

                if (res) {
                    setData(res.data.data)
                }
            })
            .catch(() => {
                setIsLoading(false);
                Nprogress.done()
                navigate('/panel/orders')
            })
    }

    const delete_cart = (id: number): void => {
        setData(prev => ({
            ...prev,
            products: prev.products.filter(product => product.id != id)
        }))
    }

    const change_product_count = (id: number, newCount: number): void => {
        setData(prev => ({
            ...prev,
            products: prev.products.map(cart => {
                if (cart.id == id) {
                    cart.count = newCount
                }

                return cart;
            })
        }))
    }

    const payment_handler = (): void => {

        if (data.status != 'پرداخت نشده') {
            toast.error("امکان اجرای این عملیات وجود ندارد")
            return
        }

        if (!isPaymentLoading) {
            setIsPaymentLoading(true)
            Nprogress.start()

            HttpRequest.post(`/panel/orders/${params.id}/payment`)
                .then(res => {
                    if (res) {
                        toast.loading("در حال انتقال به درگاه")
                        window.location.href = res.data.action
                    } else {
                        setIsPaymentLoading(false)
                        Nprogress.done()
                    }
                })
                .catch(() => {
                    setIsPaymentLoading(false)
                    Nprogress.done()
                })
        }

    }

    // hooks
    useEffect(() => {
        get_data()
    }, [])

    // propertys
    const { total_price, total_discount, total_payment } = useCartCalculator(data.products)

    return (
        <>
            <div className="w-full bg-white rounded-xl px-10 py-7 max-[500px]:px-5">

                <div className="w-full flex items-center justify-between mb-8 max-[340px]:flex-col gap-4">
                    <p className="font-heavy text-[20px] max-[500px]:text-[18px] text-theme pr-5 flex items-center justify-center relative after:size-2 after:rounded-full after:bg-theme after:absolute after:content-[''] after:transform-[translateY(-0.5px)] after:right-0"> جزییات سفارش</p>

                    {
                        !isLoading ? (
                            <div className={`h-[28px] px-3 font-medium rounded-full text-[15px] flex items-center justify-center ${data.status == Status.SUCCESS ? 'bg-[#00c07318] text-[#00c073]' : 'bg-[#ed19431a] text-[#ed1943]'}`}>{data.status}</div>
                        ) : <div className="w-[70px] h-[13px] bg-gray-200 rounded-full animation-pluse" v-if="isLoading"></div>
                    }

                </div>

                <div className="w-full flex items-center justify-center flex-wrap gap-y-4 border-b border-gray-200/60 pb-6">
                    <div className="w-1/4 flex items-start justify-center flex-col max-[800px]:w-2/4 max-[400px]:w-full">
                        <p className="text-[15px] font-medium text-gray-400"># کد تراکنش</p>
                        {
                            !isLoading ? <span className="text-[17px] font-bold text-dark-200">{data.code}</span> : <span className="w-[60px] h-[13px] bg-gray-200 animation-pluse rounded-full mt-1"></span>
                        }
                    </div>
                    <div className="w-1/4 flex items-start justify-center flex-col max-[800px]:w-2/4 max-[400px]:w-full">
                        <p className="text-[15px] font-medium text-gray-400">تاریخ</p>
                        {
                            !isLoading ? <span className="text-[17px] font-bold text-dark-200">{data.created_at}</span> : <span className="w-[60px] h-[13px] bg-gray-200 animation-pluse rounded-full mt-1"></span>
                        }
                    </div>
                    <div className="w-1/4 flex items-start justify-center flex-col max-[800px]:w-2/4 max-[400px]:w-full">
                        <p className="text-[15px] font-medium text-gray-400">شماره موبایل</p>
                        {
                            !isLoading ? <span className="text-[17px] font-bold text-dark-200">{data.phone}</span> : <span className="w-[60px] h-[13px] bg-gray-200 animation-pluse rounded-full mt-1"></span>
                        }
                    </div>
                    <div className="w-1/4 flex items-start justify-center flex-col max-[800px]:w-2/4 max-[400px]:w-full">
                        <p className="text-[15px] font-medium text-gray-400">تحویل گیرنده</p>
                        {
                            !isLoading ? <span className="text-[17px] font-bold text-dark-200">{data.full_name}</span> : <span className="w-[60px] h-[13px] bg-gray-200 animation-pluse rounded-full mt-1"></span>
                        }
                    </div>
                </div>
                <div className="w-full flex items-center justify-center flex-wrap gap-y-4 pt-6 pb-3">
                    <div className="w-1/4 flex items-start justify-center flex-col max-[800px]:w-2/4 max-[400px]:w-full">
                        <p className="text-[15px] font-medium text-gray-400">جمع کل</p>
                        {
                            !isLoading ? <span className="text-[17px] font-bold text-dark-200">{total_price.toLocaleString()} تومان</span> : <span className="w-[60px] h-[13px] bg-gray-200 animation-pluse rounded-full mt-1"></span>
                        }
                    </div>
                    <div className="w-1/4 flex items-start justify-center flex-col max-[800px]:w-2/4 max-[400px]:w-full">
                        <p className="text-[15px] font-medium text-gray-400">سود شما</p>
                        {
                            !isLoading ? <span className="text-[17px] font-bold text-dark-200">{total_discount.toLocaleString()} تومان</span> : <span className="w-[60px] h-[13px] bg-gray-200 animation-pluse rounded-full mt-1"></span>
                        }
                    </div>
                    <div className="w-1/4 flex items-start justify-center flex-col max-[800px]:w-2/4 max-[400px]:w-full">
                        <p className="text-[15px] font-medium text-gray-400">{data.status == Status.FAIL ? 'قابل پرداخت' : 'پرداخت شده '} </p>
                        {
                            !isLoading ? <span className="text-[17px] font-bold text-dark-200">{total_payment.toLocaleString()} تومان</span> : <span className="w-[60px] h-[13px] bg-gray-200 animation-pluse rounded-full mt-1"></span>
                        }
                    </div>
                    <div className="w-1/4 flex items-start justify-center flex-col max-[800px]:w-2/4 max-[400px]:w-full">
                        <p className="text-[15px] font-medium text-gray-400">درگاه پرداخت</p>
                        {
                            !isLoading ? <span className="text-[17px] font-bold text-dark-200">{data.driver}</span> : <span className="w-[60px] h-[13px] bg-gray-200 animation-pluse rounded-full mt-1"></span>
                        }
                    </div>
                </div>
            </div>
            <div className="w-full bg-white rounded-xl px-10 py-7 mt-7 max-[500px]:px-5">
                <div className="w-full flex items-center justify-between mb-8 max-[450px]:flex-col max-[450px]:gap-4">
                    <p
                        className="font-heavy text-[20px] max-[500px]:text-[18px] text-theme pr-5 flex items-center justify-center relative after:size-2 after:rounded-full after:bg-theme after:absolute after:content-[''] after:transform-[translateY(-0.5px)] after:right-0">
                        کالا های سفارشی</p>

                    {
                        data.status == Status.FAIL && !isLoading ? (
                            <div onClick={payment_handler} className={`btn-title !w-auto transition-all w-full h-[45px] rounded-lg text-[15px] font-bold max-[450px]:!w-full ${isPaymentLoading && 'loading'}`}>
                                {
                                    isPaymentLoading ? <Loading /> : 'نهایی سازی سفارش'
                                }
                            </div>
                        ) : ''
                    }

                </div>

                <div className="w-full flex items-center justify-center flex-col gap-3">
                    {
                        isLoading ? (
                            <>
                                <ProductBoxLoading />
                                <ProductBoxLoading />
                                <ProductBoxLoading />
                            </>
                        ) : data.status == Status.SUCCESS ? (
                            data.products.map(product => (<OrderSuccessProduct key={product.id} product={product} />))
                        ) : (
                            data.products.map(product => (<CartProduct key={product.id} is_order={true} request={`panel/orders/${data.id}/${product.id}`} product={product} onDeleteCart={delete_cart} onChangeProductCount={change_product_count} isAvailable={product.count <= product.total} />))
                        )
                    }
                </div>
            </div>
        </>
    )
}