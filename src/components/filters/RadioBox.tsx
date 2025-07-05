import toast from "react-hot-toast";

type Props = {
    data: { id: number, title: string, value: string },
    selector: keyof Props['data'],
    model: string,
    setModel: (value: string) => void,
    isLoading: boolean
}

export default function RadioBox({ data, selector, model, setModel, isLoading }: Props) {

    const is_selected = model == data[selector];

    const handleToggle = (): void | undefined => {

        if (isLoading) {
            toast.error("لطفا منتظر بمانید...")
            return
        }

        if (is_selected) {
            setModel('')
        }
        else {
            setModel(String(data[selector]))
        }
    }

    return (
        <div className="w-full flex items-center justify-start gap-2 cursor-pointer" onClick={handleToggle}>
            <div className={`size-[20px] border border-gray-200 rounded-full flex items-center justify-center transition-all ${is_selected && 'border-theme bg-theme'}`}>
                <svg className={`size-3 text-white transition-all opacity-0 ${is_selected && 'opacity-100'}`} width="56" height="40" viewBox="0 0 56 40" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                        d="M53.5978 8.60487C55.5504 6.65225 55.5504 3.48642 53.5978 1.5338C51.6451 -0.418819 48.4793 -0.418819 46.5267 1.5338L20.4493 27.6112L9.18202 16.3439C7.2294 14.3913 4.06357 14.3913 2.11095 16.3439C0.158329 18.2965 0.158329 21.4624 2.11095 23.415L16.9164 38.2204C18.869 40.173 22.0348 40.173 23.9874 38.2204C24.0332 38.1746 24.0779 38.1282 24.1215 38.0811L53.5978 8.60487Z"
                        fill="currentColor"></path>
                </svg>
            </div>
            <span className="text-gray-500 text-[15px] select-none font-regular">{data.title}</span>
        </div>
    )
}