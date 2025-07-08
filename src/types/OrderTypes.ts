export enum Status {
    SUCCESS = "پرداخت شده",
    FAIL = "پرداخت نشده",
}

interface OrderProductsType {
    id: number,
    product_id: number,
    productType_id: string,
    image: string,
    color_code: string,
    color_title: string,
    count: number
}

export interface OrderType {
    id: number,
    code: string,
    status: Status,
    driver: string,
    total: string,
    created_at: number | string,
    products: OrderProductsType[]
}