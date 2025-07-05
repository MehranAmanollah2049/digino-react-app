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
                                <svg xmlns="http://www.w3.org/2000/svg"  className="size-4 fill-gray-400 transition-custom group-hover/item:fill-theme" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z"/></svg>
                            </Link>
                        ))
                    )
            }
        </div>
    )
}