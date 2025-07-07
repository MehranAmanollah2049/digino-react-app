import { useEffect, useState } from "react"
import HttpRequest from "../api/ApiConfig";
import { useNavigate, useParams } from "react-router";

enum Status {
    SUCCESS = "پرداخت شده",
    FAIL = "پرداخت نشده",
}

interface OrderType {
    code: string,
    status: Status
}

export default function OrderResult() {

    const params = useParams()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<OrderType>({
        code: '0',
        status: Status.FAIL
    });

    useEffect(() => {
        HttpRequest.get(`/order-status/${params.id}`)
            .then(res => {
                if (res) {
                    setIsLoading(false)
                    setOrder(res.data)
                }
                else {
                    throw new Error("error")
                }
            })
            .catch(() => {
                navigate('/')
            })
    }, [])

    return (
        <div className="w-full min-h-[calc(100vh-270px)] px-5 py-38 flex flex-col items-center justify-center gap-4 sm:py-45">
            {!isLoading ? (
                <>
                    <div className={`size-[90px] rounded-full flex items-center justify-center sm:size-[110px] ${order.status === Status.SUCCESS ? "bg-[#3bce9325]" : "bg-red-100"}`}>
                        {
                                order.status == Status.SUCCESS ? (
                                    <svg className="size-[40px] sm:size-[50px] text-green" width="56" height="40" viewBox="0 0 56 40" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M53.5978 8.60487C55.5504 6.65225 55.5504 3.48642 53.5978 1.5338C51.6451 -0.418819 48.4793 -0.418819 46.5267 1.5338L20.4493 27.6112L9.18202 16.3439C7.2294 14.3913 4.06357 14.3913 2.11095 16.3439C0.158329 18.2965 0.158329 21.4624 2.11095 23.415L16.9164 38.2204C18.869 40.173 22.0348 40.173 23.9874 38.2204C24.0332 38.1746 24.0779 38.1282 24.1215 38.0811L53.5978 8.60487Z"
                                            fill="currentColor"></path>
                                    </svg>
                                ) : (
                                    <svg className="size-[50px] max-[500px]:size-[40px] translate-y-[3px] text-red" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.70784 1.71418C8.0984 1.32204 8.0984 0.68625 7.70784 0.294107C7.31728 -0.0980358 6.68405 -0.0980358 6.29349 0.294107L4.00038 2.5965L1.70727 0.294107C1.31671 -0.0980358 0.683483 -0.0980358 0.292921 0.294107C-0.0976404 0.68625 -0.0976404 1.32204 0.292921 1.71418L2.58603 4.01658L0.292921 6.31898C-0.0976404 6.71112 -0.0976404 7.34691 0.292921 7.73905C0.683483 8.13119 1.31671 8.13119 1.70727 7.73905L4.00038 5.43665L6.29349 7.73905C6.68405 8.13119 7.31728 8.13119 7.70784 7.73905C8.0984 7.34691 8.0984 6.71112 7.70784 6.31898L5.41473 4.01658L7.70784 1.71418Z" fill="currentColor"></path>
                                    </svg>
                                )
                            }
                    </div>
                    <p className="text-title font-bold text-[17px] text-center sm:text-[20px]">
                        {order.status === Status.SUCCESS ? (
                            <>
                                سفارش شما با کد تراکنش {order.code} با{" "}
                                <span className="font-bold text-green">موفقیت</span> ثبت گردید
                            </>
                        ) : (
                            <>
                                سفارش با{" "}
                                <span className="font-bold text-theme">شکست</span> مواجه گردید
                            </>
                        )}
                    </p>
                </>
            ) : (
                <>
                    <div className="size-[90px] rounded-full bg-gray-200 animate-pulse sm:size-[110px]"></div>
                    <div className="w-[180px] h-[10px] rounded-full bg-gray-200 animate-pulse sm:w-[250px]"></div>
                    <div className="w-[180px] h-[10px] rounded-full bg-gray-200 animate-pulse"></div>
                </>
            )}
        </div>

    )
}