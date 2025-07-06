import Loading from "../Loading"

type Props = {
    count: number,
    total: number,
    loading?: boolean,
    next: () => void,
    prev: () => void,
}

export default function CartCounter({ count, total, loading = false, next, prev }: Props) {
    return (
        <div className="h-[40px] flex items-center justify-between gap-2 border border-gray-200 rounded-full px-1">
            <div className={`size-[25px] bg-dark-500 rounded-full flex items-center justify-center cursor-pointer ${count >= total && 'opacity-40 pointer-events-none bg-dark-200'}`} onClick={next}>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-[21px] fill-white" viewBox="0 0 24 24" width="512"
                    height="512">
                    <path
                        d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
                </svg>
            </div>
            <span className="min-w-[30px] flex items-center justify-center text-dark-500 font-bold text-[17px] px-1">
                {
                    !loading ? count : <Loading small={true} />
                }
            </span>
            {
                count > 1 ? (
                    <div className="size-[25px] bg-dark-500 rounded-full flex items-center justify-center cursor-pointer" onClick={prev}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-[21px] fill-white" viewBox="0 0 24 24" width="512"
                            height="512">
                            <rect x="6" y="11" width="12" height="2" rx="1" />
                        </svg>
                    </div>
                ) : (
                    <div className="rounded-full pl-1 flex items-center justify-center cursor-pointer" onClick={prev}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-[18.5px] transform-[translateY(-0.5px)] fill-red"
                            viewBox="0 0 24 24" width="512" height="512">
                            <path
                                d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z" />
                            <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z" />
                            <path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                        </svg>
                    </div>
                )
            }
        </div>
    )
}