import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

type PrevUrlContextType = {
  prevUrl: string;
};

const PrevUrlContext = createContext<PrevUrlContextType>({ prevUrl: "/" });

export default function PrevUrlProvider({ children }: { children: React.ReactNode }) {
  const [prevUrl, setPrevUrl] = useState<string>("/");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    // Only save if the current path is NOT under /auth
    if (!currentPath.startsWith("/auth")) {
      setPrevUrl(currentPath);
    }
  }, [location.pathname]); // Watch only pathname

  return (
    <PrevUrlContext.Provider value={{ prevUrl }}>
      {children}
    </PrevUrlContext.Provider>
  );
}

export function usePrevUrl() {
  return useContext(PrevUrlContext);
}
