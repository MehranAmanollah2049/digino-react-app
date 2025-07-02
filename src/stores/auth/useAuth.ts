import { create } from "zustand";

type Phone = string | null;

interface AuthStore {
    phoneNumber: Phone,
    setPhoneNumber: (phoneNumber: Phone) => void,
    removePhoneNumber: () => void
}

const useAuth = create<AuthStore>((set) => ({
    phoneNumber: null,
    setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
    removePhoneNumber: () => set({ phoneNumber: null })
}))

export default useAuth;