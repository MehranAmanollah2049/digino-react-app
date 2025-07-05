
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
            <svg className="size-4 fill-title transform-[rotate(-90deg)] -ml-1" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z"/></svg>

            {children}

            <div className="w-full h-[2px] absolute bottom-0 bg-red rounded-t-full opacity-0 transition-all group-hover/btn:opacity-100"></div>
        </div>
    )
}