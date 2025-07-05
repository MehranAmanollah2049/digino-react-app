import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import SpinnerLoading from "../../SpinnerLoading"
import SearchResult from "./SearchResult"
import HttpRequest from "../../../api/ApiConfig"

type Product = {
    id: number,
    title: string,
    category: string
}

type Props = {
    isActive: boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchBox({ isActive, setIsActive }: Props) {

    const [search, setSearch] = useState<string>('')
    const [total, setTotal] = useState<number>(0)
    const [products, setProducts] = useState<Product[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const debounceTimer = useRef<any>(null);


    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        
        debounceTimer.current= setTimeout(() => {
            if (search.trim() === "") {
                removeResults()
                return;
            }
            
            setIsLoading(true)

            HttpRequest.get(`/search?search=${search}`)
                .then(res => {
                    setIsLoading(false)

                    if (res) {
                        setTotal(res.data.total)
                        setProducts(res.data.data)
                    }
                })
                .catch(() => {
                    setIsLoading(false)
                    removeResults()
                })
        }, 300);


        return () => clearTimeout(debounceTimer.current);
    }, [search]);

    const removeResults = () => {
        setProducts([])
        setTotal(0)
    }


    return (
        <div className={`fixed inset-0 min-[650px]:py-5 overflow-y-custom flex items-start justify-center z-200 transition duration-400 linear ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="fixed inset-0 bg-[#0000006e]" onClick={() => setIsActive(false)}></div>
            <div className="w-full min-h-screen relative flex items-center justify-center pointer-events-none">
                <div className={`w-full overflow-y-custom h-screen transition duration-400 linear ${isActive ? 'translate-y-0' : 'translate-y-[70%]'} min-[650px]:translate-y-0 min-[650px]:h-auto min-[650px]:w-[600px] bg-white min-[650px]:rounded-lg pointer-events-auto pt-4 pb-5 px-6`}>
                    <div className="w-full h-[45px] flex items-center justify-center gap-2 border-b border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setIsActive(false)} className="w-7 h-full cursor-pointer fill-gray-400 rotate-180" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" /></svg>
                        <input
                            type="text"
                            className="w-[calc(100%-30px)] h-full text-[15.5px] text-gray-600 font-medium outline-none border-none"
                            placeholder="دنبال چی میگردی..؟"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-start justify-center flex-col gap-2 mt-5">
                        <p className="text-theme font-medium text-[15px]">دسترسی سریع</p>
                        <div className="w-full flex items-center justify-start flex-wrap gap-2">
                            <Link to={`/products?orderBy=populars`} className="h-[28px] border border-gray-200 rounded-full flex items-center justify-center text-[14px] text-gray-500 px-2 hover:text-theme transition-all">محبوب ترین</Link>
                            <Link to={`/products?orderBy=news`} className="h-[28px] border border-gray-200 rounded-full flex items-center justify-center text-[14px] text-gray-500 px-2 hover:text-theme transition-all">جدید ترین</Link>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between mt-4">
                        <p className="text-gray-400 text-[15.5px]/8">{search.length > 0 ? total : 0} کالا</p>
                        {
                            search.length > 0 && total > 4 ?
                                <Link to={`/products?search=${search}`} onClick={() => setIsActive(false)} className="text-red text-[14px] flex items-center justify-center">
                                    مشاهده همه
                                    <svg className="size-4 fill-theme transform-[translateY(-1px)]">
                                        <use xlinkHref="#chevronLeft">
                                            <symbol id="chevronLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path
                                                    d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z">
                                                </path>
                                            </symbol>
                                        </use>
                                    </svg>
                                </Link> : ''
                        }

                    </div>
                    <div className="w-full flex items-start justify-center flex-col gap-6 mt-4">
                        {
                            isLoading ? (
                                <div className="w-full flex items-center justify-start gap-3">
                                    <SpinnerLoading />
                                    <span className="text-[14.5px] text-dark-500 font-medium">در حال جستجو...</span>
                                </div>
                            ) : search.length <= 0 ? <p className="w-full text-[15px] text-title font-medium">شروع به جستو جو کنید...</p>
                                : products.length > 0 ? products.map(product => (
                                    <SearchResult key={product.id} product={product} search={search} onClose={() => setIsActive(false)} />
                                )) : <p className="w-full text-[15px] text-title font-medium">موردی یافت نشد</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}