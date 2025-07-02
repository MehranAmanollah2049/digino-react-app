import { redirect } from "react-router";
import useToken from "../stores/auth/useToken";

export default function GuestMiddleware() {
    const { getToken } = useToken.getState();

    if (getToken()) {
        return redirect('/');
    }

}