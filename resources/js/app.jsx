import "./bootstrap";
import "../css/app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Routes/router";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("app")).render(
    <AuthProvider>
        <AppRouter />
    </AuthProvider>,
);
