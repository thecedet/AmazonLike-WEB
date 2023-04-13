import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import { hasRole, logout } from "../helpers/Auth";
import axios from "axios";

export default function NavBar({cart, setHash}) {

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
                            {window.location.pathname === "/" && (<a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Catégories</a>)}
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/">Tous les produits</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                {categories.map(category => <li><Link className="dropdown-item" onClick={() => setHash(category)} to={`#${category}`}>{category}</Link></li>)}
                            </ul>
                        </li>
                    </ul>
                    <AuthGuard  AuthComponent={ProfilComponent} UnAuthComponent={LoginComponent} props={{cart}} />
                </div>
            </div>
        </nav>
    );
}

function LoginComponent({props}) {
    return (
        <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            <li className="nav-item col-5 col-lg-auto">
                <Link className="btn btn-outline-dark" to={"/cart"} >Panier
                    <span className="badge bg-dark text-white ms-1 rounded-pill">{props.cart}</span>
                </Link>
            </li>
            <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white" bis_skin_checked="1"></div>
                <hr className="d-lg-none my-2 text-white-50" />
            </li>
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
            <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white" bis_skin_checked="1"></div>
                <hr className="d-lg-none my-2 text-white-50" />
            </li>
            <li>
                <button className="btn btn-outline-secondary dropdown-toggle position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle"></i>
                    {props.cart !== 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{props.cart}</span>}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to={"/me"}>Profil</Link></li>
                    <li><Link className="dropdown-item" to={"/cart"}>
                        Panier
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{props.cart}</span>
                    </Link></li>
                    <AuthGuard role={"ROLE_ADMIN"} AuthComponent={() => <li><Link className="dropdown-item" to="/admin">Administration</Link></li>} />
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>Se déconnecter</button></li>
                </ul>
            </li>
        </ul>
    );
}