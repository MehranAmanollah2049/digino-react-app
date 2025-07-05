import { createBrowserRouter } from "react-router";
import App from "../App";
import { lazy } from "react";

// layouts
const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));

// middlewares
import GuestMiddleware from "../middlewares/GuestMiddleware";
import VerifyAccessMiddleware from "../middlewares/VerifyAccessMiddleware";
import RegisterAccessMiddleware from "../middlewares/RegisterAccessMiddleware";

// pages
const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/auth/Login'));
const VerifyPage = lazy(() => import('../pages/auth/Verify'));
const RegisterPage = lazy(() => import('../pages/auth/Register'));
const AllProductsPage = lazy(() => import('../pages/products/Index'));

const router = createBrowserRouter([
    {
        Component: App,
        children: [

            // default 
            {
                path: '/',
                Component: DefaultLayout,
                children: [
                    { index: true , Component: HomePage },
                    { path: '/products' , Component: AllProductsPage }
                ]
            },

            // auth
            {
                path: '/auth',
                Component: AuthLayout,
                loader: GuestMiddleware,
                children: [
                    { index: true , Component: LoginPage },
                    { path: 'verify' , Component: VerifyPage , loader: VerifyAccessMiddleware },
                    { path: 'register' , Component: RegisterPage , loader: RegisterAccessMiddleware },
                ]
            }

        ]
    }
]);

export default router;