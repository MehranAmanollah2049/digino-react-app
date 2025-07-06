import { useEffect, useState } from "react"
import type { RateType } from "../../pages/products/Single"
import toast from "react-hot-toast"
import useUser from "../../stores/auth/useUser"
import Nprogress from 'nprogress'
import HttpRequest from "../../api/ApiConfig"
import { useParams } from "react-router"

type Props = {
    model: RateType,
    setModel: (rate: RateType) => void,
    loading?: boolean
}

export default function StarRating({ model, setModel, loading = false }: Props) {

    const params = useParams()
    const { isLoggedIn } = useUser()

    const [ActiveIndex, setActiveIndex] = useState<number>(-1)
    const [isMouseLeave, setIsMouseLeave] = useState<boolean>(true)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const mouse_leave = (): void => {
        setActiveIndex(model.rate)
        setIsMouseLeave(true)
    }

    const mouse_in = (index: number): void => {
        setActiveIndex(index)
        setIsMouseLeave(false)
    }

    const selectRate = (rate: number): Promise<void> | undefined => {
        if (!isLoggedIn()) {
            toast.error("ابتدا وارد حساب خود شوید")
            return;
        }


        if (!isLoading) {
            setIsLoading(true)
            Nprogress.start()

            HttpRequest.post(`/rate/${params.id}`, {
                rate
            })
                .then(res => {
                    setIsLoading(false)
                    Nprogress.done()

                    if (res) {
                        setModel(res.data)
                        setActiveIndex(res.data.rate)
                        toast.success("امتیاز شما با موفقیت ثبت گردید")
                    }
                })
                .catch(() => {
                    setIsLoading(false)
                    Nprogress.done()
                })
        }
    }

    useEffect(() => {
        if (!loading) {
            setActiveIndex(model.rate)
        }

    }, [loading])

    return (
        <div className="w-full flex items-center justify-between my-7 p-5 bg-gray-100/60 rounded-xl">
            <p className="font-medium text-title text-[16px]">امتیاز خود را ثبت کنید: </p>
            {
                !loading ? (
                    <div className="flex items-center justify-center gap-[3px]" style={{ direction: 'ltr' }} onMouseLeave={mouse_leave}>
                        {
                            [1, 2, 3, 4, 5].map((index) => (
                                <svg xmlns="http://www.w3.org/2000/svg" key={index}
                                    className={`size-[19px] transform-[translateY(-2px)] transition ease-in-out duration-100 fill-gray-400/50 cursor-pointer ${index <= Math.ceil(ActiveIndex) && 'fill-orange-600'} ${index == ActiveIndex && !isMouseLeave && 'scale-115'}`}
                                    onMouseOver={() => mouse_in(index)} onClick={() => selectRate(index)} viewBox="0 0 24 24" width="512"
                                    height="512">
                                    <path
                                        d="M1.327,12.4,4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6a3.227,3.227,0,0,0-1.9-5.832H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832Z">
                                    </path>
                                </svg>
                            ))
                        }
                    </div>
                ) : <div className="w-[90px] h-[14px] rounded-full bg-gray-200 animation-pluse"></div>
            }
        </div>
    )
}