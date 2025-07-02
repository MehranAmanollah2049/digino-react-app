import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router";

const PrevUrlContext = createContext<{ prevUrl: string }>({ prevUrl: '/' });

export default function PrevUrlProvider({ children }: { children: React.ReactNode }) {

    const [prevUrl, setPrevUrl] = useState<string>('/');
    const location = useLocation();
    const lastPath = useRef<string | null>(null);

    useEffect(() => {
        const currentPath = location.pathname;

        if (!currentPath.startsWith("/auth") && lastPath.current && !lastPath.current.startsWith("/auth")) {
            setPrevUrl(lastPath.current);
        }

        lastPath.current = currentPath;
    }, [location]);

    return (
        <PrevUrlContext.Provider value={{ prevUrl }}>
            {children}
        </PrevUrlContext.Provider>
    )
}

export function usePrevUrl() {
    return useContext(PrevUrlContext);
}