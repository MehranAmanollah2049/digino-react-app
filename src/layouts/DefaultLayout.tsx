import { Outlet } from "react-router"
import Menu from "../components/menu/Menu"

export default function Default() {
    return (
        <>
            <Menu />
            <Outlet />
        </>
    )
}