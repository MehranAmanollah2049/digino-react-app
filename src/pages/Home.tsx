import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


export default function Home() {
    return (
        <>
            {/* header */}
            <div className="w-full center p-7 min-[550px]:p-0 relative">
                <div className="w-full center min-[1090px]:h-[360px] min-[950px]:h-[300px] min-[800px]:h-[270px] min-[600px]:h-[210px] min-[550px]:h-[180px] min-[400px]:h-[200px] h-[170px]  relative slider-overflow-visible">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        loop={true}
                        autoplay={{
                            delay: 3000,
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
        </>
    )
}