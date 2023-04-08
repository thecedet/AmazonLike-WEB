import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import { history } from "./helpers/history";

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

export default function Router() {
    return (
        <BrowserRouter history={history}>
            <Routes>
          		<Route path="/login" element={<LoginPage />} />
          		<Route path="/" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
        	</Routes>
    	</BrowserRouter>
    );
}

