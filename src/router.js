import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import { history } from "./helpers/history";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthGuard from "./components/AuthGuard";
import RegisterPage from "./pages/RegisterPage";

export default function Router() {
    return (
        <BrowserRouter history={history}>
            <Routes>
          		<Route path="/login" element={<AuthGuard UnAuthComponent={LoginPage} redirect="/" />} />
                <Route path="/register" element={<AuthGuard UnAuthComponent={RegisterPage} redirect="/" />} />
          		<Route path="/" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
        	</Routes>
    	</BrowserRouter>
    );
}

