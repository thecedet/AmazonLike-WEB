import React from "react";

export default function AuthGuard({AuthComponent, UnAuthComponent, redirect, props}) {

    function hasJWT() {
        return localStorage.getItem("token")
    }

    function checkRedirect(Component, props) {
        if(Component == null) {
            window.location = redirect
        }else {
            return <Component props={props} />
        }
    }

    return (
        hasJWT() ? checkRedirect(AuthComponent, props) : checkRedirect(UnAuthComponent, props)
    );

}