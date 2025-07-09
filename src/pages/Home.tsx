import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import ProductCardLoading from '../components/product/ProductCardLoading';
import ProductCard from '../components/product/ProductCard';
import type { ProductCardType } from '../types/ProductTypes';
import HttpRequest from '../api/ApiConfig';
import Nprogress from 'nprogress'

export default function Home() {

    const [NewestProductsLoading, setNewestProductsLoading] = useState<boolean>(true)
    const [NewestProduct, setNewestProduct] = useState<ProductCardType[]>([])

    const [PopularProductsLoading, setPopularProductsLoading] = useState<boolean>(true)
    const [PopularProduct, setPopularProduct] = useState<ProductCardType[]>([])

    const [DiscountProductsLoading, setDiscountProductsLoading] = useState<boolean>(true)
    const [DiscountProduct, setDiscountProduct] = useState<ProductCardType[]>([])

    const fetch_new_products = async () => {
        await HttpRequest.get('/new-products')
            .then(res => {
                setNewestProductsLoading(false)
                setNewestProduct(res.data.data)
            })
    }

    const fetch_discount_products = async () => {
        await HttpRequest.get('/discount-products')
            .then(res => {
                setDiscountProductsLoading(false)
                setDiscountProduct(res.data.data)
            })
    }

    const fetch_popular_products = async () => {
        await HttpRequest.get('/popular-products')
            .then(res => {
                setPopularProductsLoading(false)
                setPopularProduct(res.data.data)
            })
    }

    useEffect(() => {
        const loadData = async () => {
            Nprogress.start();
            try {
                await Promise.all([
                    fetch_new_products(),
                    fetch_discount_products(),
                    fetch_popular_products()
                ]);
                Nprogress.done();
            } catch (error) {
                Nprogress.done();                
            }
        };

        loadData();
    }, []);


    return (
        <>
            {/* header */}
            <div className="w-full flex items-center justify-center p-7 min-[550px]:p-0 relative">
                <div className="w-full flex items-center justify-center min-[1090px]:h-[360px] min-[950px]:h-[300px] min-[800px]:h-[270px] min-[600px]:h-[210px] min-[550px]:h-[180px] min-[400px]:h-[200px] h-[170px]  relative slider-overflow-visible">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {
                                spaceBetween: 10
                            },
                            550: {
                                spaceBetween: 0
                            }
                        }}
                        pagination={{
                            el: '.header-pagination',
                            clickable: true
                        }}
                        className="w-full h-full">
                        <SwiperSlide>
                            <picture className="w-full h-full">
                                <source media="(max-width: 550px)" srcSet="/header-slider/slide-5-sm.jpg" />
                                <img src="/header-slider/slide-5-lg.jpg"
                                    className="w-full h-full object-cover max-[550px]:rounded-2xl" alt="" />
                            </picture>
                        </SwiperSlide>
                        <SwiperSlide>
                            <picture className="w-full h-full">
                                <source media="(max-width: 550px)" srcSet="/header-slider/slide-4-sm.jpg" />
                                <img src="/header-slider/slide-4-lg.jpg"
                                    className="w-full h-full object-cover max-[550px]:rounded-2xl" alt="" />
                            </picture>
                        </SwiperSlide>
                        <SwiperSlide>
                            <picture className="w-full h-full">
                                <source media="(max-width: 550px)" srcSet="/header-slider/slide-3-sm.jpg" />
                                <img src="/header-slider/slide-3-lg.jpg"
                                    className="w-full h-full object-cover max-[550px]:rounded-2xl" alt="" />
                            </picture>
                        </SwiperSlide>
                    </Swiper>
                    <div className="pagination-handler header-pagination h-[23px] px-4 absolute bottom-2 z-3 flex items-center justify-center"></div>
                </div>
            </div >

            {/* newest products */}
            <div className="w-full flex items-center justify-center py-5 min-[800px]:py-10 pb-20 min-[800px]:pb-25 min-[1300px]:py-15 min-[1300px]:pb-30">
                <div className="w-custom max-[550px]:!w-full flex flex-col gap-4">
                    <div className="w-full flex items-center justify-between px-5 min-[550px]:px-0">
                        <div className="relative text-dark-500 font-morabba-bold text-[19px] min-[550px]:text-[21px] -translate-y-[2px]">
                            <span
                                className="ml-1 text-theme relative after:content-[''] after:absolute after:w-full after:h-[8px] after:bottom-[3px] after:bg-theme-200 after:transform-[skew(-8deg)] after:right-0">
                                جدیدترین
                            </span>
                            های دیجینو
                        </div>
                        <Link to={`/products?orderBy=news`} className="text-red text-[14px] flex items-center justify-center">
                            مشاهده همه
                            <svg className="size-3 fill-theme -translate-y-[0.5px]" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z" /></svg>
                        </Link>
                    </div>
                    <div className="w-full relative overflow-x-custom px-5 min-[550px]:px-0">
                        <div className="w-max flex min-[1300px]:w-full min-[1300px]:grid min-[1300px]:grid-cols-5">
                            {
                                NewestProductsLoading ? [1, 2, 3, 4, 5].map((_, index) => <ProductCardLoading customClass={`w-[250px]`} key={index} />) : (NewestProduct.map(product => (<ProductCard key={product.id} product={product} customClass={`first:rounded-r-xl last:rounded-l-xl w-[250px] min-[1300px]:w-auto`} />)))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* discount products */}
            <div className="w-full flex items-center justify-center py-10 min-[800px]:py-15 relative">
                <div className="w-full flex items-center justify-center h-[380px] min-[1090px]:h-[300px] bg-theme absolute -z-1 top-0">
                    <svg xmlns="http://www.w3.org/2000/svg" id="beast" viewBox="0 0 1000 100" preserveAspectRatio="none"
                        className="w-[calc(100%+120px)] min-[800px]:w-full h-[60px] fill-theme absolute -top-[60px]">
                        <path d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" id="beast_bottom" viewBox="0 0 1000 100" preserveAspectRatio="none"
                        className="w-[calc(100%+120px)] min-[800px]:w-full h-[60px] fill-theme absolute -bottom-[59px]">
                        <path className="elementor-shape-fill"
                            d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z"></path>
                    </svg>
                </div>
                <div className="w-custom flex items-strech justify-between gap-7 flex-col min-[1090px]:flex-row max-[1090px]:!w-full">
                    <div className="w-full min-[1090px]:w-3/15 flex flex-row min-[1090px]:flex-col items-center min-[1090px]:items-start justify-between min-[1090px]:justify-start gap-5 py-0 min-[560px]:py-5 pt-0 min-[1090px]:pt-10 px-3 min-[1090px]:px-0">
                        <img src="/diccount-p.svg"
                            className="w-[140px] min-[355px]:w-[160px] min-[560px]:w-[200px] min-[1090px]:w-[88%] object-contain"
                            alt="" />
                        <Link to="/products"
                            className="bg-white flex items-center justify-center rounded-full px-3 py-[5px] pt-[6px] text-title text-[15px]">
                            مشاهده همه
                            <svg className="size-3 fill-theme -translate-y-[0.5px]" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z" /></svg>
                        </Link>
                    </div>
                    <div className="w-full min-[1090px]:w-12/15 center relative overflow-x-custom min-[950px]:overflow-x-visible px-5 min-[1090px]:px-0 justify-start min-[950px]:justify-center ">
                        <div className="w-max flex min-[950px]:grid min-[950px]:w-full min-[950px]:grid-cols-4 bg-white rounded-xl">
                            {
                                DiscountProductsLoading ? [1, 2, 3, 4].map((_, index) => <ProductCardLoading customClass={`w-[250px]`} key={index} />) : (DiscountProduct.map(product => (<ProductCard key={product.id} product={product} customClass={`first:rounded-r-xl last:rounded-l-xl w-[250px] min-[950px]:w-auto`} />)))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* popular products */}
            <div className="w-full flex items-center justify-center pt-5 min-[1300px]:pt-18">
                <div className="w-custom max-[550px]:!w-full flex flex-col gap-4">
                    <div className="w-full flex items-center justify-between px-5 min-[550px]:px-0">
                        <div className="relative text-dark-500 font-morabba-bold text-[19px] min-[550px]:text-[21px] -translate-y-[2px]">
                            <span
                                className="ml-1 text-theme relative after:content-[''] after:absolute after:w-full after:h-[8px] after:bottom-[3px] after:bg-theme-200 after:transform-[skew(-8deg)] after:right-0">
                                محبوب ترین
                            </span>
                            های دیجینو
                        </div>
                        <Link to={`/products?orderBy=populars`} className="text-red text-[14px] flex items-center justify-center">
                            مشاهده همه

                            <svg className="size-3 fill-theme -translate-y-[0.5px]" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z" /></svg>
                        </Link>
                    </div>
                    <div className="w-full relative overflow-x-custom px-5 min-[550px]:px-0">
                        <div className="w-max flex min-[1300px]:w-full min-[1300px]:grid min-[1300px]:grid-cols-5">
                            {
                                PopularProductsLoading ? [1, 2, 3, 4, 5].map((_, index) => <ProductCardLoading customClass={`w-[250px]`} key={index} />) : (PopularProduct.map(product => (<ProductCard key={product.id} product={product} customClass={`first:rounded-r-xl last:rounded-l-xl w-[250px] min-[1300px]:w-auto`} />)))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}