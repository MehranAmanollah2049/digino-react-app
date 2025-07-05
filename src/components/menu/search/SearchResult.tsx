import { useMemo } from "react"
import { Link } from "react-router"

type Product = {
    id: number,
    title: string,
    category: string
}

type Props = {
    product: Product,
    search: string,
    onClose: () => void
}

export default function SearchResult({ product, search, onClose }: Props) {

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
        <Link to={`/products/${product.id}`} onClick={onClose} className="w-full flex items-center justify-between">

            <div className="w-[calc(100%-50px)] flex items-start justify-start gap-3">
                <svg className="size-[17px] text-gray-400 transform-[translateY(-1px)]" viewBox="0 0 16 17" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7.82495" cy="7.82492" r="6.74142" stroke="gray" strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round"></circle>
                    <path d="M12.5137 12.8638L15.1568 15.4999" stroke="gray" strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round"></path>
                </svg>
                <div className="w-[calc(100%-30px)] flex items-start justify-center flex-col gap-1">
                    <p className="font-bold text-[14px] text-title w-full min-[800px]:text-[16px] -mt-1" dangerouslySetInnerHTML={{ __html: highlightedTitle }}></p>
                    <p className="text-gray-500 text-[13px] font-medium min-[800px]:text-[13px]">در دسته <span className="text-theme font-medium">{product.category}</span></p>
                </div>
            </div>

            <svg className="size-5 fill-gray-400" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z"/></svg>
        </Link>
    )
}