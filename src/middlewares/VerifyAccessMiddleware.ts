import { redirect } from "react-router";
import useAuth from "../stores/auth/useAuth";

export default function VeriftAccessMiddleware() {
    const { phoneNumber } = useAuth.getState();

    if (!phoneNumber) {
        return redirect('/auth')
    }

    return null
}