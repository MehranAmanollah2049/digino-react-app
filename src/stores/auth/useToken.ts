import { create } from "zustand";

type Token = string | null;

interface TokenStore {
    token: Token,
    setToken: (token: Token) => void,
    removeToken: () => void,
    getToken: () => Token
}

const useToken = create<TokenStore>((set, get) => ({
    token: localStorage.getItem("token") || null,
    setToken: (token) => {
        localStorage.setItem("token", `${token}`);
        set({ token })
    },
    removeToken: () => {
        localStorage.removeItem("token");
        set({ token: null })
    },
    getToken: () => get().token
}));

export default useToken;