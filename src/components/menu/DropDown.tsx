import { Link } from "react-router"
import SpinnerLoading from "../SpinnerLoading"

interface List {
    id: number,
    title: string
}

type Props = {
    keyItem: string,
    list: List[],
    loading: boolean
}

export default function DropDown({ keyItem, list, loading = false }: Props) {
    return (
        <div className="absolute w-auto min-w-[170px] h-auto py-2 bg-white shadow-custom rounded-lg right-0 top-[calc(100%+4px)] flex flex-col transition-custom opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible">
            {
                loading ?
                    <div className="w-full h-[40px] flex items-center justify-center">
                        <SpinnerLoading />
                    </div>
                    :
                    (
                        list.map(item => (
                            <Link key={item.id} to={`/products?${keyItem}=${item.id}`} className="w-full group/item text-gray-500 text-[15px] py-2 px-3 hover:bg-gray-100/80 hover:text-theme flex items-center justify-between transition-custom whitespace-nowrap gap-2">
                                {item.title}
                                <svg className="size-4 fill-gray-400 transition-custom group-hover/item:fill-theme">
                                    <use xlinkHref="#chevronLeft">
                                        <symbol id="chevronLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z">
                                            </path>
                                        </symbol>
                                    </use>
                                </svg>
                            </Link>
                        ))
                    )
            }
        </div>
    )
}