import { redirect } from "react-router";
import useAuth from "../stores/auth/useAuth";

export default function VeriftAccessMiddleware() {
    const { registerAccess } = useAuth.getState();

    if (!registerAccess) {
        return redirect('/auth')
    }

    return null
}