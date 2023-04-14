import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {

    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/products/1`).then(response => {
            setProduct(response.data)
        }).catch(window.location.href = "/")
    }, [])

    return product && (
        <h1>ProductPage: {id}</h1>
    );
}