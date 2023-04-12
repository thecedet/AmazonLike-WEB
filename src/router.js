import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import { history } from "./helpers/history";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthGuard from "./components/AuthGuard";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";

export default function Router() {
    return (
        <BrowserRouter history={history}>
            <Routes>
          		<Route path="/login" element={<AuthGuard UnAuthComponent={LoginPage} redirect="/" />} />
                <Route path="/register" element={<AuthGuard UnAuthComponent={RegisterPage} redirect="/" />} />
                <Route path="/cart" element={<AuthGuard AuthComponent={CartPage} redirect={"/login"}/>} />
                <Route path="/admin" element={<AuthGuard AuthComponent={AdminPage} redirect={"/login"} role={"ROLE_ADMIN"} />} />
          		<Route path="/" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
        	</Routes>
    	</BrowserRouter>
    );
}

