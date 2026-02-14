import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword";
import VerifyEmail from "../Pages/Auth/VerifyEmail";
import ConfirmPassword from "../Pages/Auth/ConfirmPassword";
import Dashboard from "../Pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
    {
        path: "/verify-email",
        element: <VerifyEmail />,
    },
    {
        path: "/confirm-password",
        element: <ConfirmPassword />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
