import { createContext, useContext, useEffect, useState } from "react";
import HttpRequest from "../api/ApiConfig";

type ObjectType = {
    id: number,
    title: string
}

interface ContextType {
    categorys: ObjectType[],
    brands: ObjectType[],
    isCategorysLoading: boolean
}

const CategoryContext = createContext<ContextType>({ categorys: [] , brands: [] , isCategorysLoading: true })

export default function CategoryProvider({ children }: { children: React.ReactNode }) {

    const [categorys , setCategorys] = useState<ObjectType[]>([]);
    const [brands , setBrands] = useState<ObjectType[]>([]);

    const [isCategorysLoading , setLoading] = useState<boolean>(true)

    const loadData = async (): Promise<void> => {
        const res = await HttpRequest.get("/menu-detail");

        setCategorys(res.data.categorys);
        setBrands(res.data.brands);

        setLoading(false)
    }

    useEffect(() => {
        loadData();
    },[])

    return (
        <CategoryContext.Provider value={{ 
            categorys,
            brands,
            isCategorysLoading
         }}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategorys() {
    return useContext(CategoryContext)
}