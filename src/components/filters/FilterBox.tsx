import { useState, useEffect, useRef } from "react";

type Props = {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
    borderB?: boolean
};

export default function FilterBox({ title, defaultOpen = true, children , borderB = true }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
    const [height, setHeight] = useState<number>(0);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<ResizeObserver | null>(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
        updateHeight();
    };

    const updateHeight = () => {
        if (isOpen && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    };

    useEffect(() => {
        updateHeight();

        if (contentRef.current) {
            observerRef.current = new ResizeObserver(updateHeight);
            observerRef.current.observe(contentRef.current);
        }

        return () => {
            if (observerRef.current && contentRef.current) {
                observerRef.current.unobserve(contentRef.current);
            }
        };
    }, [isOpen]);

    return (
        <div className={`w-full relative ${borderB && ' border-b border-gray-200/70'}`}>
            <div
                className="w-full flex items-center justify-between py-4 px-2 cursor-pointer"
                onClick={toggleDropdown}
            >
                <div className="flex items-center justify-start gap-2">
                    <p className="text-[16px] text-title font-medium select-none">{title}</p>
                </div>
                <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 20 20"
                    className="text-gray-400 size-4 transform translate-y-[0.5px]"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
            <div
                className="w-full overflow-hidden transition-all duration-300 ease-in-out"
                style={{ height: `${height}px` }}
            >
                <div
                    className="w-full flex items-start p-2 pt-0 pb-4 justify-center flex-col gap-3"
                    ref={contentRef}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
