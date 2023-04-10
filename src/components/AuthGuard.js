import React from "react";

export default function AuthGuard({AuthComponent, UnAuthComponent, redirect}) {

    function hasJWT() {
        return localStorage.getItem("token")
    }

    function checkRedirect(Component) {
        console.log(Component)
        if(Component == null) {
            window.location = redirect
        }else {
            return <Component />
        }
    }

    return (
        hasJWT() ? checkRedirect(AuthComponent) : checkRedirect(UnAuthComponent)
    );

}