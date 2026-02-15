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
import ProtectedRoute from "../Components/ProtectedRoute";
import GuestRoute from "../Components/GuestRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <GuestRoute>
                <Login />
            </GuestRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <GuestRoute>
                <Register />
            </GuestRoute>
        ),
    },
    {
        path: "/forgot-password",
        element: (
            <GuestRoute>
                <ForgotPassword />
            </GuestRoute>
        ),
    },
    {
        path: "/reset-password",
        element: (
            <GuestRoute>
                <ResetPassword />
            </GuestRoute>
        ),
    },
    {
        path: "/verify-email",
        element: (
            <ProtectedRoute>
                <VerifyEmail />
            </ProtectedRoute>
        ),
    },
    {
        path: "/confirm-password",
        element: (
            <ProtectedRoute>
                <ConfirmPassword />
            </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
