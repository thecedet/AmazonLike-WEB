import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function ProductPage() {

    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/products/${id}`).then(response => {
            setProduct(response.data)
        })//.catch(window.location.href = "/")
    }, [])

    return product && (
        <>
        <NavBar />
        <div className="row">
            <div className="col">
                <blockquote class="blockquote">
                    {product.name}
                </blockquote>
                <figcaption class="blockquote-footer">
                    {product.categories}
                </figcaption>
                <figcaption class="blockquote-footer">
                    {product.price}
                </figcaption>
            </div>
            <div className="col">
                {product.description}
            </div>
        </div>
        </>
    );
}