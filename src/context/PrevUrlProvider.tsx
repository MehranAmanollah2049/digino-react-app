import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

type PrevUrlContextType = {
  prevUrl: string;
};

const PrevUrlContext = createContext<PrevUrlContextType>({ prevUrl: "/" });

export default function PrevUrlProvider({ children }: { children: React.ReactNode }) {
  const [prevUrl, setPrevUrl] = useState<string>("/");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.search;

    if (!currentPath.startsWith("/auth")) {
      setPrevUrl(currentPath);
    }
  }, [location.pathname, location.search]);

  return (
    <PrevUrlContext.Provider value={{ prevUrl }}>
      {children}
    </PrevUrlContext.Provider>
  );
}

export function usePrevUrl() {
  return useContext(PrevUrlContext);
}
