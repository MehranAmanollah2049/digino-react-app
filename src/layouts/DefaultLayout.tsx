import { Outlet } from "react-router"
import Menu from "../components/menu/Menu"
import Footer from "../components/footer/Footer"
import MenuMobileBar from "../components/menu/menuMobile/MenuMobileBar"

export default function Default() {
    return (
        <>
            <Menu />
            <Outlet />
            <Footer />
            <MenuMobileBar />
        </>
    )
}