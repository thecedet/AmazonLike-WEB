import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import { hasRole, logout } from "../helpers/Auth";
import axios from "axios";

export default function NavBar({cart}) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/products/categories").then(response => {
            setCategories(response.data)
        }).catch(console.log)
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-4">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to={"/"}>AmazonLike</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><Link className="nav-link" to="https://github.com">GitHub</Link></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Catégories</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#!">Tous les produits</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                {categories.map(category => <li><a className="dropdown-item" href="#!">{category}</a></li>)}
                            </ul>
                        </li>
                    </ul>
                    <AuthGuard  AuthComponent={ProfilComponent} UnAuthComponent={LoginComponent} props={{cart}} />
                </div>
            </div>
        </nav>
    );
}

function LoginComponent() {
    return (
        <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            <li className="nav-item col-6 col-lg-auto">
                <Link className="btn btn-outline-dark" to={"/login"} >Connexion</Link>
            </li>
            <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white" bis_skin_checked="1"></div>
                <hr className="d-lg-none my-2 text-white-50" />
            </li>
            <li className="nav-item col-6 col-lg-auto">
                <Link className="btn btn-outline-dark" to={"/register"}>Inscription</Link>
            </li>
        </ul>
    );
}

function ProfilComponent({props}) {

    useEffect(() => {

    }, [props.cart])


    return (
        <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            <li className="nav-item col-6 col-lg-auto">
                <button className="btn btn-outline-dark" type="submit">
                    <i className="bi-cart-fill me-1"></i>
                    Panier
                    <span className="badge bg-dark text-white ms-1 rounded-pill">{props.cart}</span>
                </button>
            </li>
            <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white" bis_skin_checked="1"></div>
                <hr className="d-lg-none my-2 text-white-50" />
            </li>
            <li>
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="#">Profil</a></li>
                    <li><a className="dropdown-item" href="#">
                        Panier
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{props.cart}</span>
                    </a></li>
                    {hasRole("ROLE_ADMIN") ? <li><Link className="dropdown-item" to="#">Administration</Link></li> : null}
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>Se déconnecter</button></li>
                </ul>
            </li>
        </ul>
    );
}