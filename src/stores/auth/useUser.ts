import { create } from "zustand";
import useToken from "./useToken";
import HttpRequest from "../../api/ApiConfig";

interface UserData {
    id: number,
    name: string,
    lastname: string,
    phone: number | string,
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
    decrease_user_cart: () => void,
    update_user_name_family: (name: string, lastname: string) => void,
    update_user_phone: (phone: number | string) => void
}

const useUser = create<UserStore>((set, get) => {
    const { removeToken, getToken } = useToken.getState();

    const fetchUser = async (): Promise<void> => {
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

    const logOut = async (): Promise<void> => {
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

    const isLoggedIn = (): boolean => !!getToken() && !!get().user

    const set_user = (user: User): void => set({ user })

    const update_user = (data: Partial<UserData>): void => {
        const userData = get().user;

        if (!userData) return;

        set({ user: { ...userData, ...data } });
    };

    const increase_user_cart = (): void => {
        update_user({ cart: (get().user?.cart ?? 0) + 1 });
    };

    const decrease_user_cart = (): void => {
        update_user({ cart: (get().user?.cart ?? 0) - 1 });
    };

    const update_user_name_family = (name: string, lastname: string): void => {
        update_user({ name, lastname });
    };

    const update_user_phone = (phone: number | string): void => {
        update_user({ phone });
    };


    return {
        user: null,
        loading: true,
        logout_loading: false,
        isLoggedIn,
        fetchUser,
        logOut,
        set_user,
        increase_user_cart,
        decrease_user_cart,
        update_user_name_family,
        update_user_phone
    }
});

export default useUser;