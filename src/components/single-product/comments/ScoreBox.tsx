
type Props = {
    onSelect: () => void,
    title: string,
    children: React.ReactNode,
    score: string
}

export default function ScoreBox({ onSelect, title , score , children }: Props) {
    return (
        <div onClick={onSelect} className={`w-full min-[340px]:w-1/3 flex items-center justify-center flex-col gap-1 rounded-md border  transition-all px-1 py-3  font-bold cursor-pointer text-[13px] ${score == title ? 'border-dark-500 text-dark-500' : 'border-gray-300 text-gray-400'}`}>
            {children}
            {title}
        </div>
    )
}