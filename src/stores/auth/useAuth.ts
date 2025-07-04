import { create } from "zustand";

type Phone = string | null;

interface AuthStore {
    phoneNumber: Phone,
    registerAccess: boolean,
    setRegisterAcces: () => void,
    setPhoneNumber: (phoneNumber: Phone) => void,
    resetAuthData: () => void
}

const useAuth = create<AuthStore>((set) => ({
    phoneNumber: null,
    registerAccess: false,
    setRegisterAcces: () => set({ registerAccess: true }),
    setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
    resetAuthData: () => set({ phoneNumber: null , registerAccess: false })
}))

export default useAuth;