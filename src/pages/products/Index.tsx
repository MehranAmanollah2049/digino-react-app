import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router";
import type { ProductCardType } from "../../types/ProductTypes";
import ProductCardLoading from "../../components/product/ProductCardLoading";
import ProductCard from "../../components/product/ProductCard";
import HttpRequest from "../../api/ApiConfig";
import Nprogress from 'nprogress'
import FilterSectionOrder from "../../components/filters/FilterSectionOrder";
import FilterSectionTop from "../../components/filters/FilterSectionTop";
import { Sheet } from 'react-modal-sheet';

export interface FiltersType {
    search: string | null,
    categorys: number[],
    brands: number[],
    price: [number, number],
    orderBy: string
}

interface ProductDataType {
    data: ProductCardType[],
    pagination: {
        total: number,
        current: number
    }
}

const MAX_PICE = 150000000;

export default function Index() {

    // base data
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // datas
    const [ProductLoading, setProductLoading] = useState<boolean>(false);
    const [Products, setProducts] = useState<ProductDataType>({
        data: [],
        pagination: {
            total: 1,
            current: 1
        }
    })

    const [Filters, setFilters] = useState<FiltersType>({
        search: searchParams.get("search") || "",
        categorys: searchParams.get("category") ? [Number(searchParams.get("category"))] : [],
        brands: searchParams.get("brand") ? [Number(searchParams.get("brand"))] : [],
        price: [0, MAX_PICE],
        orderBy: searchParams.get("orderBy") ?? ''
    })

    const is_filters_in_use = (Filters.search != '' || Filters.categorys.length != 0 || Filters.brands.length != 0 || Filters.price[0] != 0 || Filters.price[1] != MAX_PICE || Filters.orderBy != '');

    // actions
    const fetchData = async (page: number = 1) => {
        const { categorys, brands, price, orderBy, search } = Filters;

        const params = new URLSearchParams({
            categorys: JSON.stringify(categorys),
            brands: JSON.stringify(brands),
            price_min: price[0].toString(),
            price_max: price[1].toString(),
            orderBy: orderBy || '',
            search: search || '',
            page: `${page}`,
            perPage: '12'
        });

        if (!ProductLoading) {
            setProductLoading(true)
            Nprogress.start()
            await HttpRequest.get(`/products?${params.toString()}`)
                .then(res => {
                    setProductLoading(false)
                    setProducts(res.data)
                    Nprogress.done()
                    document.documentElement.scrollTop = 0
                })
        }

    }

    const next_page = (): void | undefined => {

        if (Products.pagination.current >= Products.pagination.total) {
            return
        }

        let page = Products.pagination.current + 1;
        fetchData(page)

    }

    const prev_page = (): void | undefined => {

        if (Products.pagination.current == 1) {
            return
        }

        let page = Products.pagination.current - 1;
        fetchData(page)

    }

    const clearFilter = (): void => {
        setFilters({
            search: '',
            categorys: [],
            brands: [],
            price: [0, MAX_PICE],
            orderBy: ''
        })

        navigate("/products", { replace: true });
    }

    // hooks
    useEffect(() => {
        const newFilter = { ...Filters };

        if (searchParams.get("search")) {
            newFilter.search = searchParams.get("search");
        }

        if (searchParams.get("category")) {
            newFilter.categorys = [Number(searchParams.get("category"))];
        }

        if (searchParams.get("brand")) {
            newFilter.brands = [Number(searchParams.get("brand"))];
        }

        if (searchParams.get("orderBy")) {
            newFilter.orderBy = searchParams.get("orderBy") ?? '';
        }

        setFilters(newFilter);

    }, [searchParams]);

    // load data
    let debounceTimeout = useRef<any>(null);

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            fetchData(1)
        }, 400);
    }, [Filters])

    useEffect(() => {
        fetchData();
    }, [])

    // sheets
    const [isCategorysOpen, setCategorysOpen] = useState<boolean>(false)
    const [isOrdersOpen, setOrdersOpen] = useState<boolean>(false)

    return (
        <>
            <div className="w-full flex items-center justify-center pt-10 pb-5 min-[900px]:pt-23 min-[900px]:pb-20">
                <div className="w-custom flex items-start justify-between">
                    <div className="w-10/35 hidden min-[900px]:block min-[1010px]:w-9/35 min-[1190px]:w-8/35 p-4 border border-gray-100">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-[20px] font-bold text-dark-500">فیلتر ها</p>
                            {
                                is_filters_in_use && <div onClick={clearFilter} className="text-[15px] text-theme font-medium cursor-pointer">پاک کردن فیلتر ها</div>
                            }
                        </div>
                        <div className="w-full center flex-col pt-3">
                            <FilterSectionTop defaultOpen={true} MAX_PICE={MAX_PICE} ProductLoading={ProductLoading} Filters={Filters} setFilters={setFilters} borderB={true} />
                            <FilterSectionOrder defaultOpen={true} ProductLoading={ProductLoading} Filters={Filters} setFilters={setFilters} />
                        </div>
                    </div>
                    <div className="w-full min-[900px]:w-24/35 min-[1010px]:w-25/35 min-[1190px]:w-26/35">
                        <div
                            className="w-full gap-2 flex items-center justify-center min-[900px]:hidden pb-5">
                            <div
                                onClick={() => setCategorysOpen(true)}
                                className="w-1/2 h-[43px] rounded-xl flex items-center justify-center gap-1 border border-gray-200/70 text-dark-500 text-[15px] font-bold cursor-pointer">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24"
                                    className="w-5 h-5 text-gray-400 ml-2" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                                    </path>
                                </svg>
                                فیلتر محصولات
                            </div>
                            <div
                                onClick={() => setOrdersOpen(true)}
                                className="w-1/2 h-[43px] rounded-xl flex items-center justify-center gap-1 border border-gray-200/70 text-dark-500 text-[15px] font-bold cursor-pointer">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24"
                                    className="w-5 h-5 text-gray-400 ml-2" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
                                </svg>
                                مرتب سازی
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 min-[400px]:grid-cols-2 min-[700px]:grid-cols-3 min-[900px]:grid-cols-2 min-[1010px]:grid-cols-3 min-[1190px]:grid-cols-4 border border-gray-100">
                            {
                                ProductLoading ? (
                                    <>
                                        <ProductCardLoading />
                                        <ProductCardLoading />
                                        <ProductCardLoading />
                                        <ProductCardLoading />
                                        <ProductCardLoading />
                                        <ProductCardLoading />
                                        <ProductCardLoading />
                                        <ProductCardLoading />
                                    </>
                                ) : Products.data.map(product => (<ProductCard key={product.id} product={product} />))
                            }
                        </div>
                        {
                            Products && Products.pagination.total > 1 && (
                                <div className="w-full flex items-center justify-between pt-8">
                                    <div className={`btn-title transition-all  ${Products.pagination.current <= 1 && 'pointer-events-none opacity-40'}`} onClick={prev_page}>
                                        صفحه قبلی
                                    </div>
                                    <div className={`btn-title transition-all ${Products.pagination.current >= Products.pagination.total && 'pointer-events-none opacity-40'}`} onClick={next_page}>
                                        صفحه بعدی
                                    </div>
                                </div>
                            )
                        }

                        {
                            (Products.data.length == 0 && !ProductLoading) &&
                            (<div className="w-full py-15 flex items-center justify-center flex-col gap-3 py-3 font-bold text-gray-600">
                                <img src="/empty-cart.svg" alt="" />
                                موردی یافت نشده
                            </div>)
                        }
                    </div>
                </div >
            </div >
            <Sheet
                isOpen={isCategorysOpen}
                onClose={() => setCategorysOpen(false)}
                detent="content-height"
                tweenConfig={{
                    ease: "linear",
                    duration: 0.4
                }}
            >

                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className="w-full pb-7 px-5 overflow-y-custom">
                            <div className="w-full flex items-center justify-between mb-3">
                                <p className="text-[20px] font-bold text-dark-500">فیلتر ها</p>
                                {
                                    is_filters_in_use && <div onClick={clearFilter} className="text-[15px] text-theme font-medium cursor-pointer">پاک کردن فیلتر ها</div>
                                }
                            </div>
                            <FilterSectionTop defaultOpen={false} MAX_PICE={MAX_PICE} ProductLoading={ProductLoading} Filters={Filters} setFilters={setFilters} borderB={false} />
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={() => setCategorysOpen(false)} />
            </Sheet>
            <Sheet
                isOpen={isOrdersOpen}
                onClose={() => setOrdersOpen(false)}
                detent="content-height"
                tweenConfig={{
                    ease: "linear",
                    duration: 0.4
                }}
            >

                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <div className="w-full pb-7 px-5 overflow-y-custom">
                            <div className="w-full flex items-center justify-between mb-3">
                                <p className="text-[20px] font-bold text-dark-500">فیلتر ها</p>
                                {
                                    is_filters_in_use && <div onClick={clearFilter} className="text-[15px] text-theme font-medium cursor-pointer">پاک کردن فیلتر ها</div>
                                }
                            </div>
                            <FilterSectionOrder defaultOpen={false} ProductLoading={ProductLoading} Filters={Filters} setFilters={setFilters} />
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={() => setOrdersOpen(false)} />
            </Sheet>
        </>
    )
}