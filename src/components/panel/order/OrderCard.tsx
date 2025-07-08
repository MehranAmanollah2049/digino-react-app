import { Link } from "react-router"
import { BaseUrl } from "../../../api/ApiConfig"
import { Status, type OrderType } from "../../../types/OrderTypes"

type Props = {
    order: OrderType
}

export default function OrderCard({ order }: Props) {
    return (
        <div className="w-full rounded-lg border border-gray-200/70 bg-white p-6">
            <div className="w-full flex items-center justify-between flex-col gap-4 min-[720px]:flex-row min-[720px]:gap-0">
                <div className="flex items-center justify-start gap-2">
                    <div className="h-[28px] px-3 font-medium rounded-full text-[15px] flex items-center justify-center bg-[#ff990021] text-[#f90]">
                        درگاه {order.driver}
                    </div>
                    <div className={`h-[28px] px-3 font-medium rounded-full text-[15px] flex items-center justify-center ${order.status == Status.SUCCESS ? 'bg-[#00c07318] text-[#00c073]' : 'bg-[#ed19431a] text-[#ed1943]'}`}>
                        {order.status}
                    </div>
                </div>

                <Link to={`/panel/orders/${order.id}`} className="text-title text-[14px] flex items-center justify-center">
                    مشاهده جزییات
                    <svg className="size-4 fill-title transform-[translateY(-1px)]">
                        <use xlinkHref="#chevronLeft">
                            <symbol id="chevronLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path>
                            </symbol>
                        </use>
                    </svg>
                </Link>
            </div>
            <div className="w-full flex items-center justify-start flex-col gap-3 my-5 min-[720px]:flex-row min-[720px]:gap-7">
                <p className="text-title font-bold"># کد تراکنش: {order.code}</p>
                <p className="text-gray-400 font-medium">تاریخ: {order.created_at}</p>
                <p className="text-gray-400 font-medium">مبلغ: {order.total} تومان </p>
            </div>
            <div className="w-full bg-gray-100/60 rounded-lg p-3 flex items-center justify-start flex-wrap gap-2 min-[720px]:gap-4">
                {
                    order.products.map(product => (
                        <Link to={`/products/${product.product_id}?type=${product.productType_id}`} className="flex items-center justify-center relative" key={product.id}>
                            <div className="bg-[#4a6dff] text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center absolute top-0 -left-0 font-medium text-[14px] min-[720px]:-left-2">
                                {product.count}
                            </div>
                            <img src={BaseUrl + product.image} alt="" className="size-[120px] object-contain rounded-lg" />
                        </Link>
                    ))
                }
            </div>
        </div>

    )
}