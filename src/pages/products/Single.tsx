import { useEffect, useState } from "react"
import HttpRequest, { BaseUrl } from "../../api/ApiConfig";
import { Link, useParams, useSearchParams } from "react-router";
import Nprogress from 'nprogress'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import LikeProduct from "../../components/single-product/LikeProduct";
import Property from "../../components/single-product/Property";
import ColorItem from "../../components/single-product/ColorItem";
import useUser from "../../stores/auth/useUser";
import CartCounter from "../../components/single-product/CartCounter";
import toast from "react-hot-toast";
import SpinnerLoading from "../../components/SpinnerLoading";
import StarRating from "../../components/single-product/StarRating";
import CommentSection from "../../components/single-product/comments/CommentSection";

interface ProductType {
    id: number,
    image: string,
    color_code: string,
    color_title: string,
    count: number,
    discount: number | string | null,
    price: number | string | null,
    payment: number | string,
    cart_user: null | { id: number, count: number }
}

export interface RateType {
    total: number,
    rate: number,
}

interface ProductDataType {
    id: number,
    category: { id: number, title: string },
    brand: { id: number, title: string },
    likes: number[],
    rate: RateType,
    title: string,
    total_cmt: number,
    propertys: string[],
    types: ProductType[]
}

export default function Single() {

    // base data
    const { isLoggedIn, increase_user_cart, decrease_user_cart, loading: user_loading } = useUser()
    const [searchParams] = useSearchParams();
    const params = useParams()

    // data
    const [IsProductLoading, setIsProductLoading] = useState<boolean>(true);
    const [Product, setProduct] = useState<ProductDataType>({
        id: 0,
        category: { id: 0, title: "" },
        brand: { id: 0, title: "" },
        likes: [],
        rate: {
            total: 0,
            rate: 0,
        },
        title: "",
        total_cmt: 0,
        propertys: [],
        types: [],
    });
    const [TypeIndex, setTypeIndex] = useState<number>(0);
    const [isTypeSet, setIsTypeSet] = useState<boolean>(false);

    const [CartLoading, setCartLoading] = useState<boolean>(false);

    // actions
    const fetch_data = async (): Promise<void> => {
        Nprogress.start()
        await HttpRequest.get(`/products/${params.id}`)
            .then(res => {

                setIsProductLoading(false);
                Nprogress.done();

                setProduct(res.data)
            })
    }

    const add_to_cart = (): Promise<void> | undefined => {
        if (!isLoggedIn()) {
            toast.error("ابتدا وارد حساب خود شوید")
            return
        }

        if (currentType.count <= 0) {
            toast.error("متاسفانه از این کالا در انبار موجودی نداریم")
            return
        }

        if (!CartLoading) {
            setCartLoading(true);
            Nprogress.start()

            HttpRequest.post(`/cart/${currentType.id}`)
                .then(res => {
                    setCartLoading(false);
                    Nprogress.done()

                    if (res) {

                        setProduct((prev) => ({
                            ...prev,
                            types: prev.types.map((type, index) =>
                                index === TypeIndex
                                    ? { ...type, cart_user: res.data.data }
                                    : type
                            )
                        }));
                        increase_user_cart()
                        toast.success("کالای موردنظر به سبد خرید اضافه شد")
                    }
                })
                .catch(() => {
                    setCartLoading(false);
                    Nprogress.done()
                })
        }
    }

    const next_handler = (): Promise<void> | undefined => {
        if (!isLoggedIn()) {
            toast.error("ابتدا وارد حساب خود شوید")
            return
        }

        if (!currentType.cart_user) {
            toast.error("امکان اجرای این عملیات وجود ندارد")
            return
        }

        let new_count = currentType.cart_user.count + 1;

        if (new_count > currentType.count) {
            toast.error("متاسفانه به این مقدار در انبار موجودی نداریم")
            return
        }

        if (!CartLoading) {
            setCartLoading(true);
            Nprogress.start()

            HttpRequest.post(`/cart/${currentType.cart_user.id}/increase`)
                .then(res => {
                    setCartLoading(false);
                    Nprogress.done()

                    if (res) {
                        setProduct((prev) => ({
                            ...prev,
                            types: prev.types.map((type, index) =>
                                index === TypeIndex
                                    ? { ...type, cart_user: { id: type!.cart_user!.id, count: Number(res.data.count) } }
                                    : type
                            )
                        }));
                    }
                })
                .catch(() => {
                    setCartLoading(false);
                    Nprogress.done()
                })
        }
    }

    const prev_handler = (): Promise<void> | undefined => {
        if (!isLoggedIn()) {
            toast.error("ابتدا وارد حساب خود شوید")
            return
        }

        if (!currentType.cart_user) {
            toast.error("امکان اجرای این عملیات وجود ندارد")
            return
        }

        if (!CartLoading) {
            setCartLoading(true);
            Nprogress.start()

            HttpRequest.post(`/cart/${currentType.cart_user.id}/decrease`)
                .then(res => {
                    setCartLoading(false);
                    Nprogress.done()
                    if (res) {

                        if (!res.data.is_deleted) {
                            setProduct((prev) => ({
                                ...prev,
                                types: prev.types.map((type, index) =>
                                    index === TypeIndex
                                        ? { ...type, cart_user: { id: type!.cart_user!.id, count: Number(res.data.count) } }
                                        : type
                                )
                            }));
                        }
                        else {
                            setProduct((prev) => ({
                                ...prev,
                                types: prev.types.map((type, index) =>
                                    index === TypeIndex
                                        ? { ...type, cart_user: null }
                                        : type
                                )
                            }));
                            decrease_user_cart()
                            toast.success("کالای موردنظر از سبد خرید حذف شد")
                        }
                    }
                })
                .catch(() => {
                    setCartLoading(false);
                    Nprogress.done()
                })
        }
    }

    // swiper
    const [swiperInstance, setSwiperInstance] = useState<any>(null);

    const goToIndex = (index: number): void => {
        if (swiperInstance) {
            swiperInstance.slideTo(index)
        }
    }

    // hooks
    useEffect(() => {
        fetch_data()
    }, []);

    

    useEffect(() => {
    if (!isTypeSet && Product.types.length > 0 && swiperInstance) {
        const type = searchParams.get("type");
        if (type) {
            const index = Product.types.findIndex(item => item.id === parseInt(type));
            if (index !== -1) {
                setTypeIndex(index);
                goToIndex(index);
            }
        }
        setIsTypeSet(true);
    }
}, [Product, searchParams, swiperInstance, isTypeSet]);


    // propertys
    const currentType = Product.types[TypeIndex];
    const Images = Product.types.map(type => ({ id: type.id, image: type.image }))



    return (
        <div className="w-full flex items-center justify-center pt-3 min-[900px]:pt-15">
            <div className="w-custom px-1 min-[900px]:px-0 flex flex-col items-center justify-between min-[900px]:flex-row min-[900px]:items-start">
                <div className="w-full h-[280px] relative min-[550px]:h-[360px] min-[550px]:w-[400px] min-[900px]:w-14/35 min-[1000px]:w-13/35 min-[1080px]:w-11/35">
                    {
                        !IsProductLoading ? (
                            <>
                                <Swiper
                                    onSwiper={setSwiperInstance}
                                    modules={[Pagination]}
                                    loop={true}
                                    slidesPerView={1}
                                    pagination={{
                                        el: '.header-pagination',
                                        clickable: true
                                    }}
                                    className="w-full h-full">
                                    {
                                        Images.map(item => (
                                            <SwiperSlide key={item.id}>
                                                <img src={`${BaseUrl}${item.image}`}
                                                    className="w-full h-full object-contain max-[550px]:rounded-lg" alt="" />
                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>
                                <div className="w-full flex items-center justify-center absolute bottom-4 z-3">
                                    <div
                                        className="pagination-handler !w-auto bg-[#00000021] rounded-full header-pagination h-[20px] px-2 center">
                                    </div>
                                </div>
                            </>
                        ) : <div className="w-full h-full bg-gray-200 rounded-2xl animation-pluse"></div>
                    }
                </div>
                <div className="w-full mt-2 min-[900px]:w-20/35 min-[1000px]:w-21/35 min-[1080px]:w-23/35 min-[900px]:mt-0">
                    {/* road path */}
                    <div className="w-full flex items-center justify-start gap-1">
                        <Link to="/products" className="text-blue-500 font-medium text-[14px]">فروشگاه</Link>
                        <span className="text-gray-300">/</span>
                        {
                            !IsProductLoading ? (
                                <>
                                    <Link to={`/products?category=${Product.category.id}`}
                                        className="text-blue-500 font-medium text-[14px]">{Product.category.title}</Link>
                                    <span className="text-gray-300">/</span>
                                    <Link to={`/products?brand=${Product.brand.id}`}
                                        className="text-blue-500 font-medium text-[14px]">{Product.brand.title}</Link>
                                </>
                            ) : (
                                <>
                                    <div className="w-[30px] h-[10px] rounded-full bg-gray-200 animation-pluse"></div>
                                    <span className="text-gray-300">/</span>
                                    <div className="w-[30px] h-[10px] rounded-full bg-gray-200 animation-pluse"></div>
                                </>
                            )
                        }
                    </div>
                    {/* title */}
                    {
                        !IsProductLoading ? (<p className="w-full text-right font-bold text-dark-500 text-[18.5px] py-1 min-[550px]:text-[20px]">{Product.title}</p>) : (
                            <>
                                <p className="w-full h-[13px] bg-gray-200 animation-pluse rounded-full mt-5"></p>
                                <p className="w-[40%] h-[13px] bg-gray-200 animation-pluse rounded-full mt-3 mb-5"></p>
                            </>
                        )
                    }

                    {/* star , total_comments , like , count */}
                    <div className="w-full flex items-center justify-between relative mt-2">
                        <div className="bg-white flex items-center justify-start gap-2 relative z-1 pl-4">
                            {
                                !IsProductLoading ? (
                                    <>
                                        {/* start */}
                                        <div className="h-[25px] flex items-center justify-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="size-[13px] transform-[translateY(-2px)] fill-orange-600" viewBox="0 0 24 24"
                                                width="512" height="512">
                                                <path
                                                    d="M1.327,12.4,4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6a3.227,3.227,0,0,0-1.9-5.832H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832Z" />
                                            </svg>
                                            <p className="text-[13px] font-medium text-gray-400">{Math.ceil(Product.rate.rate)} ({Product.rate.total})</p>
                                        </div>

                                        {/* comments */}
                                        <div className="h-[25px] bg-gray-200/70 text-dark-500 text-[13px] flex items-center justify-center px-2 pt-[1px] rounded-full cursor-pointer font-medium">
                                            {Product.total_cmt} دیدگاه
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="size-[13px] transform-[translateY(-0.5px)] fill-dark-500" viewBox="0 0 24 24"
                                                width="512" height="512">
                                                <path
                                                    d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z" />
                                            </svg>
                                        </div>

                                        {/* count */}
                                        <div className={`h-[25px] text-[13px] flex items-center justify-center px-2 pt-[1px] rounded-full cursor-pointer font-medium ${currentType.count > 10 && 'bg-[#e9edff] text-[#4a6dff]'} ${currentType.count <= 10 && 'bg-[#ed194311] text-[#ed1944]'}`}>
                                            {currentType.count > 0 ? `${currentType.count} عدد موجود` : 'عدم موجودی'}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-[50px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                                        <div className="w-[50px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                                        <div className="w-[50px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                                    </>
                                )
                            }
                        </div>
                        <div className="w-full h-[1px] bg-gray-200/60 absolute left-0"></div>
                        <div className="bg-white pr-4 center relative z-1 transform-[translateY(-1px)]">
                            {
                                !IsProductLoading ? <LikeProduct model={Product.likes} setModel={(likes) => setProduct(prev => ({ ...prev, likes }))} product_id={Product.id} /> : <div className="w-[50px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                            }
                        </div>
                    </div>

                    {/* popertys */}
                    <div className="w-full flex items-start justify-center flex-col gap-2 my-7">
                        <p className="text-[16px] font-bold text-dark-200">ویژگی ها:</p>
                        <div className="w-full flex items-center justify-start gap-4 flex-wrap">
                            {
                                !IsProductLoading ? (
                                    Product.propertys.map((property, index) => (<Property key={index} title={property} />))
                                ) : (
                                    <>
                                        <div className="w-[60px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                                        <div className="w-[60px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                                        <div className="w-[60px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                                        <div className="w-[60px] h-[10px] bg-gray-200 rounded-full animation-pluse"></div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    {/* colors */}
                    <div className="w-full flex items-start justify-center flex-col gap-2 my-7">
                        <p className="text-[16px] font-bold text-dark-200">رنگ بندی ها:</p>
                        <div className="w-full flex items-center justify-start gap-3 flex-wrap">
                            {
                                !IsProductLoading ? (
                                    Product.types.map(type => ({ id: type.id, title: type.color_title, color: type.color_code })).map((item, index) => (<ColorItem key={item.id} data={item} index={index} TypeIndex={TypeIndex} setTypeIndex={setTypeIndex} goToIndex={goToIndex} />))
                                ) : (
                                    <>
                                        <div className="flex items-center justify-start gap-2 mt-2">
                                            <div className="size-[30px] rounded-full bg-gray-200 animation-pluse"></div>
                                            <p className="w-[40px] h-[10px] bg-gray-200 animation-pluse rounded-full"></p>
                                        </div>
                                        <div className="flex items-center justify-start gap-2 mt-2">
                                            <div className="size-[30px] rounded-full bg-gray-200 animation-pluse"></div>
                                            <p className="w-[40px] h-[10px] bg-gray-200 animation-pluse rounded-full"></p>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    {/* price + cart */}
                    <div className="w-full flex items-center justify-between pt-1">
                        {/* cart */}
                        {
                            !IsProductLoading && !user_loading ? (
                                isLoggedIn() && currentType.cart_user ? (
                                    <CartCounter next={next_handler} prev={prev_handler} count={currentType.cart_user.count} total={currentType.count} loading={CartLoading} />
                                ) : (
                                    <div className={`btn-title  transition-colors !h-[43px] gap-2 px-5 pb-[2px] ${CartLoading && 'loading'}`} onClick={add_to_cart}>
                                        {
                                            !CartLoading ? (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="size-[18px] fill-white -translate-y-[1px]"><path fill="currentColor" d="m3.19 15.437.851-.207-.85.207Zm0-6.182-.85-.208.85.208Zm17.445 0 .85-.208-.85.208Zm0 6.182.85.208-.85-.208Zm-5.76 5.348-.192-.854.192.854Zm-5.924 0-.193.854.193-.854Zm0-16.878.192.854-.192-.854Zm5.924 0 .192-.854-.192.854Zm-6.446 16.76.192-.853-.192.854Zm6.968 0 .192.854-.192-.854Zm0-16.642-.193.853.193-.853Zm-6.968 0-.193-.854.193.854Zm-4.254 1.61-.86.158.86-.158ZM3.47 6.65a.875.875 0 0 0 1.721-.315L3.47 6.65ZM1.327 1.727a.875.875 0 1 0-.308 1.723l.308-1.723Zm6.462 19.334c.087.188.121.4.096.608l1.738.208a2.878 2.878 0 0 0-.247-1.554l-1.587.738Zm.096.608c-.025.21-.107.404-.234.562l1.364 1.096c.334-.416.544-.92.608-1.45l-1.738-.208Zm-.234.562a1.019 1.019 0 0 1-.474.331l.549 1.662c.507-.168.954-.48 1.289-.896L7.65 22.23Zm-.474.331a.968.968 0 0 1-.56.015l-.46 1.688c.516.14 1.06.127 1.569-.041l-.549-1.662Zm-.56.015a1.011 1.011 0 0 1-.487-.305l-1.306 1.165c.356.399.818.688 1.333.828l.46-1.688Zm-.487-.305a1.1 1.1 0 0 1-.261-.547l-1.725.294c.09.527.324 1.02.68 1.418l1.306-1.165Zm-.261-.547a1.13 1.13 0 0 1 .066-.613l-1.622-.658a2.88 2.88 0 0 0-.17 1.565l1.726-.294Zm.066-.613c.078-.193.206-.354.366-.469L5.284 19.22c-.434.31-.77.74-.971 1.235l1.622.658Zm11.487-.302c.15.131.263.307.322.508l1.68-.494a2.833 2.833 0 0 0-.848-1.33l-1.154 1.316Zm.322.508c.06.202.062.417.006.62l1.687.464a2.882 2.882 0 0 0-.014-1.578l-1.678.494Zm.006.62a1.09 1.09 0 0 1-.314.515l1.178 1.294c.396-.36.68-.828.823-1.345l-1.687-.465Zm-.314.515a.997.997 0 0 1-.514.249l.274 1.728a2.748 2.748 0 0 0 1.418-.683l-1.178-1.294Zm-.514.249a.971.971 0 0 1-.557-.077l-.727 1.592a2.72 2.72 0 0 0 1.558.213l-.274-1.728Zm-.557-.077a1.036 1.036 0 0 1-.44-.386l-1.475.943c.289.452.7.812 1.188 1.035l.727-1.592Zm-.44-.386a1.117 1.117 0 0 1-.175-.589l-1.75.02c.006.536.161 1.06.45 1.512l1.474-.943Zm-.175-.589a1.12 1.12 0 0 1 .161-.593l-1.495-.91A2.87 2.87 0 0 0 14 21.67l1.75-.02ZM8.62 4.878l.522-.117-.385-1.708-.522.118.385 1.707Zm6.062-.117.521.117.385-1.707-.522-.118-.384 1.708Zm.521 15.053-.521.117.384 1.708.522-.118-.385-1.707Zm-6.061.117-.522-.117-.385 1.707.522.118.385-1.707ZM4.041 15.23a12.172 12.172 0 0 1 0-5.768l-1.7-.415a13.922 13.922 0 0 0 0 6.598l1.7-.415Zm15.744-5.768a12.171 12.171 0 0 1 0 5.768l1.7.415a13.923 13.923 0 0 0 0-6.598l-1.7.415Zm-5.102 10.47a12.586 12.586 0 0 1-5.54 0l-.385 1.707c2.079.468 4.231.468 6.31 0l-.385-1.707ZM9.143 4.76a12.587 12.587 0 0 1 5.54 0l.384-1.708a14.337 14.337 0 0 0-6.309 0l.385 1.708Zm-.522 15.053c-2.233-.504-4.015-2.27-4.58-4.584l-1.7.415c.717 2.937 2.992 5.222 5.895 5.876l.385-1.707Zm6.968 1.707c2.903-.654 5.179-2.939 5.896-5.876l-1.7-.415c-.565 2.313-2.347 4.08-4.58 4.584l.384 1.707Zm-.385-16.643c2.234.504 4.016 2.27 4.58 4.584l1.7-.415c-.716-2.937-2.992-5.221-5.895-5.876l-.385 1.707ZM8.236 3.171c-2.903.655-5.178 2.939-5.895 5.876l1.7.415c.565-2.313 2.347-4.08 4.58-4.584l-.385-1.707ZM3.7 17.124h16.426v-1.75H3.7v1.75ZM3.314 5.793l.157.856 1.721-.315-.156-.856-1.722.315ZM1.02 3.45c1.147.205 2.073 1.128 2.295 2.343l1.722-.315c-.35-1.907-1.817-3.413-3.71-3.75L1.02 3.45Z"></path><path stroke="currentColor" strokeLinecap="round" strokeWidth="1" d="m13.423 7.256.047.006c1.993.285 3.453 1.762 3.453 3.494"></path></svg>
                                                    افزودن به سبد خرید
                                                </>
                                            ) : <SpinnerLoading />
                                        }
                                    </div>
                                )
                            ) : <div className="w-[80px] h-[13px] bg-gray-200 animation-pluse rounded-full"></div>
                        }

                        {/* prices */}
                        <div className="flex h-[50px] items-end justify-center flex-col">
                            {
                                !IsProductLoading ? (
                                    <>
                                        {currentType.discount ? (
                                            <div className="flex items-center justify-center gap-[7px] -mb-[3px]">
                                                <p
                                                    className="text-[15.5px] text-gray-400/80 font-medium line-through transform-[translateY(0.5px)]">
                                                    {currentType.price}</p>
                                                <div
                                                    className="h-[20px] bg-theme rounded-[50px] px-2 pt-[0.7px] text-white flex items-center justify-center text-[13px] font-bold shadow-theme-200">
                                                    <span className="font-bold -mb-[1.2px]">%</span> {currentType.discount}
                                                </div>
                                            </div>
                                        ) : ''}
                                        <div className="flex items-center justify-center gap-1 text-title font-bold text-[23px]">
                                            {currentType.payment}
                                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 51.29 27.19"
                                                width="51" height="27" className="fill-gray-400 w-5 h-5">
                                                <path
                                                    d="M36.48 22.85c1.78-.83 2.93-1.81 3.45-2.94h-1.65c-2.53 0-4.69-.66-6.47-1.97-.59.68-1.23 1.2-1.93 1.55s-1.54.53-2.5.53c-1.03 0-1.87-.18-2.51-.53-.65-.35-1.14-.96-1.5-1.83-.35-.87-.56-2.08-.63-3.62-.02-.28-.04-.6-.04-.97s-.01-.72-.04-1.07c-.14-3.42-.28-6.26-.42-8.51l-5.8 1.37c.73 1.64 1.34 3.34 1.83 5.08.49 1.75.74 3.58.74 5.5 0 1.6-.37 3.12-1.11 4.57-.74 1.46-1.85 2.64-3.32 3.57-1.48.93-3.27 1.39-5.38 1.39s-3.82-.45-5.21-1.34C2.61 22.74 1.6 21.6.96 20.22c-.63-1.38-.95-2.84-.95-4.36 0-1.2.13-2.28.4-3.25.27-.97.63-1.93 1.07-2.87l2.39 1.34c-.38.92-.65 1.71-.83 2.39-.18.68-.26 1.48-.26 2.39 0 1.76.49 3.19 1.48 4.29s2.63 1.65 4.92 1.65c1.55 0 2.87-.32 3.96-.95 1.09-.63 1.9-1.44 2.43-2.43.53-.98.79-1.98.79-2.99 0-2.65-.82-5.82-2.46-9.5l1.69-3.52L22.38.79c.16-.05.39-.07.67-.07.54 0 .98.19 1.32.56s.53.88.58 1.51c.14 2.04.27 5.02.39 8.94.02.38.04.75.04 1.13s.01.71.04 1.02c.05 1.03.22 1.78.53 2.25s.81.7 1.51.7c.84 0 1.52-.18 2.04-.53.52-.35.97-1 1.37-1.93.75-1.71 1.33-2.96 1.74-3.75.41-.79.94-1.46 1.58-2.04.64-.57 1.44-.86 2.37-.86 1.83 0 3.27.94 4.31 2.83s1.69 4.06 1.95 6.53c1.57-.02 2.77-.13 3.61-.33.83-.2 1.41-.49 1.72-.88.32-.39.47-.89.47-1.5 0-.75-.16-1.67-.49-2.76-.33-1.09-.69-2.1-1.09-3.04l2.43-1.23c1.22 3.1 1.83 5.44 1.83 7.04 0 1.83-.67 3.18-2 4.04-1.34.87-3.53 1.34-6.58 1.41-.49 2.21-1.8 3.93-3.92 5.19-2.12 1.25-4.68 1.98-7.69 2.16l-1.2-2.88c2.6-.14 4.8-.63 6.58-1.46ZM10.38 5.66l.11 3.31-3.2.28-.46-3.31 3.55-.28Zm25.1 10.83c.88.28 1.81.42 2.8.42h1.93c-.16-1.67-.55-3.08-1.16-4.26-.61-1.17-1.38-1.76-2.32-1.76-.75 0-1.42.45-2.02 1.34-.6.89-1.11 1.92-1.53 3.1.66.49 1.42.88 2.3 1.16ZM43.64.21C45.06.07 46.43 0 47.74 0c.96 0 1.67.02 2.11.07l-.21 2.81c-.42-.05-1.08-.07-1.97-.07-1.2 0-2.44.07-3.73.21s-2.44.32-3.45.53L39.86.81c1.1-.26 2.36-.46 3.78-.6Z"
                                                    data-name="Layer 1"></path>
                                            </svg>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-[50px] h-[10px] rounded-full bg-gray-200 animation-pluse mb-2"></div>
                                        <div className="w-[80px] h-[10px] rounded-full bg-gray-200 animation-pluse"></div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    {/* rating */}
                    <StarRating model={Product.rate} setModel={(rate: RateType) => setProduct(prev => ({ ...prev, rate }))} loading={IsProductLoading} />

                    {/* comments */}
                    <CommentSection />
                </div>
            </div>
        </div>
    )
}