import { Link } from "react-router";
import SpinnerLoading from "../../../SpinnerLoading";

type Props = {
    title: string,
    list: { id: number, title: string }[],
    keyItem: string,
    children: React.ReactNode,
    loading?: boolean,
    onSheetClose: () => void
}

export default function ScrollableItems({ title, list, keyItem , children , loading = false , onSheetClose }: Props) {
    return (
        <div className="w-full flex items-start justify-center gap-2 flex-col">
            <p className='text-dark-500 font-bold text-[16px] flex items-center justify-start gap-2'>
                {children}
                {title}
            </p>
            <div className="w-full flex items-center justify-start overflow-x-custom">
                {
                    loading ?
                        (
                            <div className="w-full flex items-center justify-start gap-3 py-3">
                                <SpinnerLoading />
                                <span className="text-[14.5px] text-dark-500 font-medium">در حال گرفتن اطلاعات...</span>
                            </div>
                        )
                        : (
                            <div className="w-auto flex items-center justify-start gap-2">
                                {
                                    list.map(item => (
                                        <Link onClick={onSheetClose} to={`/products?${keyItem}=${item.id}`} className="h-[28px] whitespace-nowrap border border-gray-200 rounded-full flex items-center justify-center text-[14px] text-gray-500 px-2 hover:text-theme transition-all">{item.title}</Link>
                                    ))
                                }
                            </div>
                        )
                }
            </div>
        </div>
    )
}