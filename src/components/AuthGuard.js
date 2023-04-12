import React from "react";
import { hasRole } from "../helpers/Auth";

export default function AuthGuard({AuthComponent, UnAuthComponent, redirect, role,...props}) {

    function hasJWT() {
        return localStorage.getItem("token")
    }

    function checkRedirect(Component, props) {
        if(Component == null) {
            if(redirect !== undefined) window.location = redirect
            else return null
        }else {
            return <Component {...props} />
        }
    }

    return (
        hasJWT() && hasRole(role) ? checkRedirect(AuthComponent, props) : checkRedirect(UnAuthComponent, props)
    );

}