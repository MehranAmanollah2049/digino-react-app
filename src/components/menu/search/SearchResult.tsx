import { useMemo } from "react"
import { Link } from "react-router"

type Product = {
    id: number,
    title: string,
    category: string
}

type Props = {
    product: Product,
    search: string
}

export default function SearchResult({ product, search }: Props) {

    const highlightedTitle = useMemo(() => {
        const title = product.title;

        if (!search) return title; // اگر سرچ خالی بود همون عنوان رو نشون بده

        const regExp = new RegExp(`(${search})`, 'gi');
        return title.replace(
            regExp,
            `<mark class="bg-yellow-200 px-1 rounded">$1</mark>`
        );
    }, [product.title, search]);

    return (
        <Link to={`/products/${product.id}`} className="w-full flex items-center justify-between">

            <div className="w-[calc(100%-50px)] flex items-start justify-start gap-3">
                <svg className="size-[17px] text-gray-400 transform-[translateY(-1px)]" viewBox="0 0 16 17" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7.82495" cy="7.82492" r="6.74142" stroke="gray" strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round"></circle>
                    <path d="M12.5137 12.8638L15.1568 15.4999" stroke="gray" strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round"></path>
                </svg>
                <div className="w-[calc(100%-30px)] flex items-start justify-center flex-col gap-1">
                    <p className="font-bold text-[16px] text-title w-full max-[800px]:text-[14px] -mt-1" dangerouslySetInnerHTML={{ __html: highlightedTitle }}></p>
                    <p className="text-gray-500 text-[14px] font-medium max-[800px]:text-[13px]">در دسته <span className="text-theme font-medium">{product.category}</span></p>
                </div>
            </div>

            <svg className="size-5 fill-gray-400">
                <use xlinkHref="#searchPlaceSuggest">
                    <symbol id="searchPlaceSuggest" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M17 8.414L6.707 18.707l-1.414-1.414L15.586 7H9V5h9a1 1 0 011 1v9h-2V8.414z"></path>
                    </symbol>
                </use>
            </svg>
        </Link>
    )
}