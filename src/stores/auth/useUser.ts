import { create } from "zustand";
import useToken from "./useToken";
import HttpRequest from "../../api/ApiConfig";

interface UserData {
    id: number,
    name: string,
    lastname: string,
    phone: number,
    cart: number
}

type User = UserData | null;

interface UserStore {
    user: User,
    loading: boolean,
    logout_loading: boolean,
    isLoggedIn: () => boolean,
    fetchUser: () => Promise<void>,
    logOut: () => Promise<void>,
    set_user: (user: User) => void,
    increase_user_cart: () => void,
    decrease_user_cart: () => void
}

const useUser = create<UserStore>((set, get) => {
    const { removeToken, getToken } = useToken.getState();

    const fetchUser = async () => {
        if (getToken()) {
            set({ loading: true })

            try {
                const res = await HttpRequest.get('/auth/user');

                set({ loading: false })
                if (res) {
                    set({ user: res?.data.user })
                } else {
                    throw new Error('auth error')
                }

            } catch (e) {

                removeToken()
                set({ loading: false, user: null })
            }
        }
        else {
            set({ loading: false })
        }
    }

    const logOut = async () => {
        if (!get().logout_loading) {
            set({ logout_loading: true })
            try {
                await HttpRequest.delete("/auth/logout");
                removeToken()
                set({ logout_loading: false, user: null })
            } catch (e) {
                removeToken()
                set({ logout_loading: false, user: null })
            }
        }
    }

    const isLoggedIn = () => !!getToken() && !!get().user

    const set_user = (user: User) => set({ user })

    const increase_user_cart = () => {
        const userData = get().user;

        if (!userData) return;

        set({ user: { ...userData, cart: userData.cart + 1 } })
    }

    const decrease_user_cart = () => {
        const userData = get().user;

        if (!userData) return;

        set({ user: { ...userData, cart: userData.cart - 1 } })
    }

    return {
        user: null,
        loading: true,
        logout_loading: false,
        isLoggedIn,
        fetchUser,
        logOut,
        set_user,
        increase_user_cart,
        decrease_user_cart
    }
});

export default useUser;