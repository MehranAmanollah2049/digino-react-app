import type { CartType } from "../types/ProductTypes";

export default function useCartCalculator(Products: CartType[]) {
    const available_carts: CartType[] = Products?.filter(cart => cart.count <= cart.total) || [];

    const total_price: number = available_carts?.reduce((total, current) => {
        if (current.price) {
            return total + (Number(current.price) * current.count);
        }
        else {
            return total + (Number(current.payment) * current.count);
        }
    }, 0);

    const total_discount: number = available_carts?.reduce((total, current) => {
        if (current.discount) {
            return total + ((Number(current.price) - Number(current.payment)) * current.count);
        }

        return total
    }, 0);

    const total_payment: number = available_carts?.reduce((total, current) => {
        return total + (Number(current.payment) * current.count);
    }, 0);


    return {
        available_carts,
        total_price,
        total_discount,
        total_payment
    }
}