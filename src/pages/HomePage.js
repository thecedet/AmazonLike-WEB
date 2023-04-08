import React from "react";

import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function HomePage() {
    return (
        <>
        <NavBar />
                
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </section>

        <Footer />
        </>
    );
}

export default HomePage