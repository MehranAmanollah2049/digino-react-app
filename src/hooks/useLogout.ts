import { useLocation, useNavigate } from "react-router";
import Nprogress from 'nprogress'
import useUser from "../stores/auth/useUser";
import toast from "react-hot-toast";

export default function useLogout() {
    const locaton = useLocation();
    const navigate = useNavigate();
    const { logOut } = useUser();

    const logout_handler = async(): Promise<void> => {
        Nprogress.start();
        await logOut();
        Nprogress.done();
        redirectHandler()
        toast.success("از حساب خود خارج شدید");

    }

    const redirectHandler = () => {
        if (locaton.pathname.startsWith('/cart') || locaton.pathname.startsWith('/panel')) {
            return navigate('/')
        }
    }

    return { logout_handler }
}