import { Link } from "react-router"

type Props = {
    onClickEvent: () => void,
    title: string,
    link: string,
    isActive?: boolean,
    children: React.ReactNode
}

export default function PanelLinkItem({ onClickEvent, title, link, isActive = false , children }: Props) {
    return (
        <Link onClick={onClickEvent} to={link} className={`w-full py-3 px-4 flex items-center justify-between rounded-xl transition-all group ${isActive && 'bg-theme-100 active'}`}>
            <div className="flex items-center justify-center gap-2">
                {children}
                <span className={`text-[15.5px] font-medium transition-all ${isActive ? 'text-theme' : 'text-dark-200'}`}>{title}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"
                className={`size-[16px] transition-all ${isActive ? 'fill-theme' : 'fill-dark-200'}`}>
                <path
                    d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
            </svg>
        </Link>
    )
}