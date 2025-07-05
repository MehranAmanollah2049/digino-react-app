import type { FiltersType } from "../../pages/products/Index";
import FilterBox from "./FilterBox";
import RadioBox from "./RadioBox";

type Props = {
    ProductLoading: boolean,
    Filters: FiltersType,
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>,
    defaultOpen: boolean
}

export default function FilterSectionOrder({ ProductLoading, Filters, setFilters , defaultOpen }: Props) {
    return (
        <FilterBox defaultOpen={defaultOpen} title="مرتب سازی" borderB={false}>
            <RadioBox isLoading={ProductLoading} data={{ id: 1, title: 'جدیدترین ها', value: 'news' }} selector="value" model={Filters.orderBy} setModel={(value) => setFilters(prev => ({ ...prev, orderBy: value }))} />
            <RadioBox isLoading={ProductLoading} data={{ id: 2, title: 'قدیمی ترین ها', value: 'olds' }} selector="value" model={Filters.orderBy} setModel={(value) => setFilters(prev => ({ ...prev, orderBy: value }))} />
            <RadioBox isLoading={ProductLoading} data={{ id: 3, title: 'محبوب ترین ها', value: 'populars' }} selector="value" model={Filters.orderBy} setModel={(value) => setFilters(prev => ({ ...prev, orderBy: value }))} />
        </FilterBox>
    )
}
