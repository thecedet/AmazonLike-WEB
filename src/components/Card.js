import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Card({product, cart, setCart}) {

    const [counter, setCounter] = useState(0)

    const handle = nbr => {
        setCart(cart + nbr)
        setCounter(counter+1)
        localStorage.setItem("cart", cart + nbr)
    }

    return (
        <div className="col mb-5">
            <div className="card h-100">
                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{product.name}</h5>
                        {/*<div className="d-flex justify-content-center small text-warning mb-2">
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                        </div>*/}
                        {product.price} €
                        <blockquote className="blockquote" style={{opacity: "0.75", color: "gray"}}>{product.shortDescription}</blockquote>
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    {(cart !== 0) ? (
                        <div className="row justify-content-md-center card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <button className="btn btn-outline-secondary col col-lg-2" onClick={() => handle(-1)}>-</button>
                            <span className="col-md-auto">{counter}</span>
                            <button className="btn btn-outline-secondary col col-lg-2" onClick={() => handle(1)}>+</button>
                        </div>) : (
                        <div className="text-center">
                            <button className="btn btn-outline-dark mt-auto" onClick={() => handle(1)}>Ajouter au panier</button>
                        </div>
                    )}
                    <div className="text-center">
                            <Link className="btn btn-outline-dark mt-auto" to={`/product/${product.id}`}>Voir</Link>
                    </div>

                    
                </div>
            </div>
        </div>
    );

}