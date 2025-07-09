import { createBrowserRouter } from "react-router";
import App from "../App";
import { lazy } from "react";

// layouts
const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const PanelLayout = lazy(() => import('../layouts/PanelLayout'));

// middlewares
import GuestMiddleware from "../middlewares/GuestMiddleware";
import VerifyAccessMiddleware from "../middlewares/VerifyAccessMiddleware";
import RegisterAccessMiddleware from "../middlewares/RegisterAccessMiddleware";
import AuthMiddleware from "../middlewares/AuthMiddleware";

// pages
const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/auth/Login'));
const VerifyPage = lazy(() => import('../pages/auth/Verify'));
const RegisterPage = lazy(() => import('../pages/auth/Register'));
const AllProductsPage = lazy(() => import('../pages/products/Index'));
const SingleProductPage = lazy(() => import('../pages/products/Single'));
const CartPage = lazy(() => import('../pages/Cart'));
const OrderResultPage = lazy(() => import('../pages/OrderResult'));
const DashboardPage = lazy(() => import('../pages/panel/Dashboard'));
const LikesPage = lazy(() => import('../pages/panel/Likes'));
const OrderPage = lazy(() => import('../pages/panel/orders/Index'));
const OrderSinglePage = lazy(() => import('../pages/panel/orders/Single'));
const ProfilePage = lazy(() => import('../pages/panel/Profile'));
const NotFound = lazy(() => import('../pages/errors/NotFound'));
const ServerError = lazy(() => import('../pages/errors/ServerError'));

const router = createBrowserRouter([
    {
        Component: App,
        children: [

            // default 
            {
                path: '/',
                Component: DefaultLayout,
                children: [
                    { index: true, Component: HomePage },
                    {
                        path: '/products',
                        children: [
                            { index: true, Component: AllProductsPage },
                            { path: ':id', Component: SingleProductPage }
                        ]
                    },
                    { path: '/cart', Component: CartPage, loader: AuthMiddleware },
                    { path: '/orders/:id', Component: OrderResultPage }
                ]
            },

            // auth
            {
                path: '/auth',
                Component: AuthLayout,
                loader: GuestMiddleware,
                children: [
                    { index: true, Component: LoginPage },
                    { path: 'verify', Component: VerifyPage, loader: VerifyAccessMiddleware },
                    { path: 'register', Component: RegisterPage, loader: RegisterAccessMiddleware },
                ]
            },

            // panel
            {
                path: '/panel',
                Component: PanelLayout,
                loader: AuthMiddleware,
                children: [
                    { index: true, Component: DashboardPage },
                    { path: 'likes', Component: LikesPage },
                    {
                        path: 'orders',
                        children: [
                            { index: true, Component: OrderPage },
                            { path: ':id', Component: OrderSinglePage }
                        ]
                    },
                    { path: 'profile', Component: ProfilePage }
                ]
            },
        ]
    },
    // error page
    {
        path: '/500',
        Component: ServerError
    },
    {
        path: '*',
        Component: NotFound
    }
]);

export default router;