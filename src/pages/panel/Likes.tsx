import { useEffect, useState } from "react"
import type { ProductCardType } from "../../types/ProductTypes";
import Nprogress from 'nprogress'
import HttpRequest from "../../api/ApiConfig";
import ProductBoxLoading from "../../components/cart/ProductBoxLoading";
import ProductLikeBox from "../../components/panel/likes/ProductLikeBox";

export default function Likes() {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [items, setItems] = useState<ProductCardType[]>([]);

    const get_data = async () => {
        Nprogress.start()
        await HttpRequest.get('/panel/likes')
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

    const decrease_like_count = ({ id }: { id: number, likes: number[] }): void => {
        setItems(prev => prev.filter(item => item.id != id))
    }

    useEffect(() => {
        get_data()
    }, [])

    return (
        <div className="w-full py-6 bg-white rounded-xl px-6 min-[500px]:px-8 min-[500px]:py-6">
            <div className="w-full flex items-center justify-start">
                <p className="font-heavy text-[18px] min-[500px]:text-[25px] text-theme pr-5 flex items-center justify-center relative after:size-2 after:rounded-full after:bg-theme after:absolute after:content-[''] after:transform-[translateY(-0.5px)] after:right-0">علاقه مندی ها</p>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-2 mt-5">
                {
                    isLoading ? (
                        <>
                            <ProductBoxLoading />
                            <ProductBoxLoading />
                            <ProductBoxLoading />
                        </>
                    ) : items.length > 0 ? items.map(product => (<ProductLikeBox key={product.id} product={product} likeTracker={decrease_like_count} />)) : (
                        <div className="w-full flex items-center justify-center flex-col gap-3 font-bold text-gray-600 py-3">
                            <img src="/favorites-list-empty.svg" alt="" />
                            <span>موردی یافت نشد</span>
                        </div>
                    )

                }
            </div>
        </div>
    )
}