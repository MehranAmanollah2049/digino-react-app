
type Props = {
    data: { id: number, title: string, color: string },
    index: number,
    TypeIndex: number,
    setTypeIndex: React.Dispatch<React.SetStateAction<number>>,
    goToIndex: (index: number) => void
}

export default function ColorItem({ data, index, TypeIndex, setTypeIndex, goToIndex }: Props) {

    const pickColor = (): void => {
        setTypeIndex(index)
        goToIndex(index)
    }

    return (
        <div className="flex items-center justify-center gap-1 text-title text-[15px] font-bold cursor-pointer" onClick={pickColor}>
            <div className={`size-[28px] rounded-full border border-gray-300 p-[2px] ${TypeIndex == index && 'border-green'}`}>
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: data.color }}>
                    <svg className={`size-3 transition-all opacity-0 ${TypeIndex == index && 'opacity-100'} ${data.color == '#fff' ? 'text-dark-500' : 'text-white'}`} width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M53.5978 8.60487C55.5504 6.65225 55.5504 3.48642 53.5978 1.5338C51.6451 -0.418819 48.4793 -0.418819 46.5267 1.5338L20.4493 27.6112L9.18202 16.3439C7.2294 14.3913 4.06357 14.3913 2.11095 16.3439C0.158329 18.2965 0.158329 21.4624 2.11095 23.415L16.9164 38.2204C18.869 40.173 22.0348 40.173 23.9874 38.2204C24.0332 38.1746 24.0779 38.1282 24.1215 38.0811L53.5978 8.60487Z"
                            fill="currentColor"></path>
                    </svg>
                </div >
            </div >
            {data.title}
        </div >
    )
}