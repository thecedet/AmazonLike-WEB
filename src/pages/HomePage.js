import React, { useEffect, useState } from "react";

import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import axios from "axios";

function HomePage() {

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8080/products").then(response => {
            setProducts(response.data)
        }).catch(console.log)
    }, [])

    return (
        <>
        <NavBar cart={cart} />
                
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {products.map(product => <Card key={product.id} product={product} cart={cart} setCart={setCart} />)}
                </div>
            </div>
        </section>

        <Footer />
        </>
    );
}

export default HomePage