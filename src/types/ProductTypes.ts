
export type ProductCardType = {
    id: number,
    brand: string,
    title: string,
    likes: number[],
    colors: string[],
    type_id: number,
    type_color: string,
    image: string,
    count: number,
    discount: number | string | null,
    price: number | string | null,
    payment: number | string
}

export interface CartType {
    id: number,
    title: string,
    product_id: string,
    type_id: string,
    count: number,
    total: number,
    color_code: string,
    color_title: string,
    image: string,
    discount: number | string | null,
    price: number | string | null,
    payment: number | string
}