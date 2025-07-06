import { useEffect } from "react"
import useLike from "../../hooks/useLike"
import SpinnerLoading from "../SpinnerLoading"

type Props = {
    model: number[],
    setModel: (likes: number[]) => void,
    product_id: number
}

export default function LikeProduct({ model, setModel, product_id }: Props) {

    const { isLikeLoading, handleLike, HasLiked, LikeList } = useLike(product_id, model)

    useEffect(() => {
        setModel(LikeList)
    }, [LikeList])

    return (
        <div className="flex items-center justify-center cursor-pointer" onClick={handleLike} >
            {
                !isLikeLoading ? (
                    <svg className={`size-[23px] ${HasLiked ? 'fill-theme' : 'stroke-dark-500 fill-white'}`} fill="none" width="13" height="11" viewBox="0 0 13 11" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.95035 1.229C4.81955 1.229 5.61243 1.66166 6.21284 2.15457C6.81326 1.66166 7.60614 1.229 8.47534 1.229C10.3497 1.229 11.8691 2.62275 11.8691 4.34192C11.8691 7.80824 7.92382 9.82702 6.62321 10.3984C6.36123 10.5134 6.06445 10.5134 5.80248 10.3984C4.50187 9.827 0.556602 7.80816 0.556602 4.34184C0.556602 2.62267 2.07603 1.229 3.95035 1.229Z"
                            strokeWidth="0.761705"></path>
                    </svg>
                ) : <SpinnerLoading />
            }

        </div >
    )
}