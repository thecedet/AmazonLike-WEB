import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";


export default function() {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [lastName, setLastName] = useState()
    const [firstName, setFirstName] = useState()

    const [visible, setVisble] = useState(false)
    const [load, setLoad] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:8080/users/me").then(response => {
            setUsername(response.data.username)
            setEmail(response.data.email)
            setLastName(response.data.lastName)
            setFirstName(response.data.firstName)
        })
    }, [])

    useEffect(() => {
        if(load == 2) {
            setVisble("button")
            return;
        }
        setLoad(load+1)
    }, [username, email, lastName, firstName])

    function updateData() {
        axios.put("http://localhost:8080/users/update/me", {username, email, lastName, firstName}).then(
            setVisble("alert")
        ).catch(console.log)
    }

    return (
        <>
        <NavBar />
        <div class="container">
            
            {visible == "alert" && (
                <div class="alert alert-success position-absolute top-2 end-0" role="alert">
                    Bravo !
                </div>
            )}

            <div class="row">
                <div class="col">
                    <h1>Profil</h1>
                    <form className="needs-validation" noValidate="" autoComplete="off">
						<div className="mb-3">
						    <label className="mb-2 text-muted" htmlFor="username">Username</label>
							<input id="username" type="text" className="form-control" name="username" required autoFocus value={username} onChange={e => setUsername(e.target.value)}/>
						</div>
						<div className="mb-3">
						    <label className="mb-2 text-muted" htmlFor="email">E-Mail</label>
							<input id="email" type="email" className="form-control" name="email" required value={email} onChange={e => setEmail(e.target.value)}/>
						</div>
                        <div className="mb-3">
							<div className="mb-2 w-100">
								<label className="text-muted" htmlFor="lastName">Nom</label>
							</div>
						    <input id="lastName" type="text" className="form-control" name="lastName" required value={lastName} onChange={e => setLastName(e.target.value)} />
						</div>
                        <div className="mb-3">
							<div className="mb-2 w-100">
								<label className="text-muted" htmlFor="firstName">Prénom</label>
							</div>
						    <input id="firstName" type="text" className="form-control" name="firstName" required value={firstName} onChange={e => setFirstName(e.target.value)}/>
						</div>
					</form>
                    {visible == "button" && (
                            <div className="d-flex align-items-center">
							    <button className="btn btn-primary ms-auto" onClick={updateData}>Modifier</button>
						    </div>
                        )}
                </div>
                <div class="col">
                    <h1>Mot de passe</h1>
                </div>
            </div>
        </div>
        </>
    );
}