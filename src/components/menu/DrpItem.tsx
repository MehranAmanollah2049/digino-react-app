
type Props = {
    title: string,
    children: React.ReactNode,
    icon: React.ReactNode,
}

export default function DrpItem({ title , children , icon }: Props) {
    return (
        <div className="group/btn w-auto h-full relative flex items-center justify-center gap-1 text-title text-[14px] font-medium cursor-pointer transition-all hover:text-red">
            {icon}
            {title}
            <svg className="size-4 fill-title transform-[rotate(-90deg)] -ml-1">
                <use xlinkHref="#chevronLeft">
                    <symbol id="chevronLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z">
                        </path>
                    </symbol>
                </use>
            </svg>

            {children}

            <div className="w-full h-[1.5px] absolute bottom-0 bg-red rounded-t-full opacity-0 transition-all group-hover/btn:opacity-100"></div>
        </div>
    )
}