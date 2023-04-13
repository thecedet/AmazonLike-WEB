import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";


export default function() {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [lastName, setLastName] = useState()
    const [firstName, setFirstName] = useState()

    const [visible, setVisble] = useState([])
    const [load, setLoad] = useState(0)

    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

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
            setVisble(["pbutton"])
        }
    }, [cpassword, password])

    useEffect(() => {
        if(load == 2) {
            setVisble(["button"])
            return;
        }
        setLoad(load+1)
    }, [username, email, lastName, firstName])

    function updateData() {
        axios.put("http://localhost:8080/users/update/me", {username, email, lastName, firstName}).then(
            setVisble(["alert", "success", "Information modifiées"])
        ).catch(console.log)
    }

    function updatePasswrd() {
        if(password !== cpassword) {
            setVisble(["alert", "danger", "Password pas bon :'("]);
            return
        }
        axios.put("http://localhost:8080/users/update/me/password", {password}).then(_ => {
            setPassword("")
            setCPassword("")
            setVisble(["alert", "success", "Mot de passe modifié"])
        }).catch(console.log)
    }

    return (
        <>
        <NavBar />
        <div class="container">
            
            {visible[0] == "alert" && (
                <div className={`alert alert-${visible[1]} position-absolute top-2 end-0`} role="alert">
                    {visible[2]}
                </div>
            )}

            <div className="row">
                <div className="col">
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
                <div className="col">
                    <h1>Mot de passe</h1>
                    <form className="needs-validation" noValidate="" autoComplete="off">
						<div className="mb-3">
						    <label className="mb-2 text-muted" htmlFor="password">Mot de passe</label>
							<input id="password" type="password" className="form-control" name="password" required autoFocus value={password} onChange={e => setPassword(e.target.value)}/>
						</div>
                        <div className="mb-3">
							<div className="mb-2 w-100">
								<label className="text-muted" htmlFor="cpassword">Confirmation</label>
							</div>
						    <input id="cpassword" type="password" className="form-control" name="cpassword" required value={cpassword} onChange={e => setCPassword(e.target.value)}/>
						</div>
					</form>
                    {visible == "pbutton" && (
                        <div className="d-flex align-items-center">
							<button className="btn btn-primary ms-auto" onClick={updatePasswrd}>Modifier</button>
						</div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}