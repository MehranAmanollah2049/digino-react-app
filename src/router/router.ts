import { createBrowserRouter } from "react-router";
import App from "../App";
import { lazy } from "react";
import GuestMiddleware from "../middlewares/GuestMiddleware";
import VeriftAccessMiddleware from "../middlewares/VeriftAccessMiddleware";

// layouts
const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));

// pages
const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/auth/Login'));
const VerifyPage = lazy(() => import('../pages/auth/Verify'));

const router = createBrowserRouter([
    {
        Component: App,
        children: [

            // default 
            {
                path: '/',
                Component: DefaultLayout,
                children: [
                    { index: true , Component: HomePage }
                ]
            },

            // auth
            {
                path: '/auth',
                Component: AuthLayout,
                loader: GuestMiddleware,
                children: [
                    { index: true , Component: LoginPage },
                    { path: 'verify' , Component: VerifyPage , loader: VeriftAccessMiddleware },
                ]
            }

        ]
    }
]);

export default router;