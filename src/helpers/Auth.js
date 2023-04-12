import axios from "axios"
import jwtDecode from "jwt-decode";


export const setAuthToken = token => {
    if(token || token !== undefined) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    window.location.reload()
}

export const refresh = token => {
    localStorage.setItem("token", token);
    setAuthToken(token);
}

export const getRoles = () => {
    const token = localStorage.getItem("token")
    if(token == null) {
        return [];
    }
    return jwtDecode(token).auth;
}

export const hasRole = role => {
    return role === undefined || getRoles().includes(role)
}