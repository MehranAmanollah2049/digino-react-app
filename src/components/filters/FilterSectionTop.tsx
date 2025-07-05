import { useCategorys } from "../../context/CategoryProvider";
import type { FiltersType } from "../../pages/products/Index";
import SpinnerLoading from "../SpinnerLoading";
import CheckBoxItem from "./CheckBoxItem";
import FilterBox from "./FilterBox";
import PriceHandler from "./PriceHandler";

type Props = {
    ProductLoading: boolean,
    Filters: FiltersType,
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>,
    MAX_PICE: number,
    borderB: boolean,
    defaultOpen: boolean
}

export default function FilterSectionTop({ ProductLoading, Filters, setFilters , MAX_PICE , borderB , defaultOpen }: Props) {

    const { categorys, brands, isCategorysLoading } = useCategorys()

    return (
        <>
            <FilterBox defaultOpen={defaultOpen} title="دسته بندی" >
                {
                    isCategorysLoading ? (
                        <div className="w-full h-[50px] flex items-center justify-center">
                            <SpinnerLoading />
                        </div>
                    ) : (
                        categorys.map(category => (
                            <CheckBoxItem isLoading={ProductLoading} key={category.id} data={category} selector="id" model={Filters.categorys} setModel={(value) => setFilters(prev => ({ ...prev, categorys: value }))} />
                        ))
                    )
                }
            </FilterBox>
            <FilterBox defaultOpen={defaultOpen} title="برند ها" >
                {
                    isCategorysLoading ? (
                        <div className="w-full h-[50px] flex items-center justify-center">
                            <SpinnerLoading />
                        </div>
                    ) : (
                        brands.map(brand => (
                            <CheckBoxItem isLoading={ProductLoading} key={brand.id} data={brand} selector="id" model={Filters.brands} setModel={(value) => setFilters(prev => ({ ...prev, brands: value }))} />
                        ))
                    )
                }
            </FilterBox>

            <FilterBox defaultOpen={defaultOpen} title="محدوده قیمت" borderB={borderB}>
                <PriceHandler isLoading={ProductLoading} max={MAX_PICE} model={Filters.price} setModel={(min, max) => setFilters(prev => ({ ...prev, price: [min, max] }))} />
            </FilterBox>

            
        </>
    )
}
