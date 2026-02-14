import './bootstrap';
import '../css/app.css';
import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Routes/router";

ReactDOM.createRoot(document.getElementById("app")).render(
    <AppRouter />
);
