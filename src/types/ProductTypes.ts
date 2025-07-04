
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