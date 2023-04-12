import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import axios from "axios";
import { refresh } from "../helpers/Auth";

export default function AdminPage() {

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])


    useEffect(() => {
        axios.get("http://localhost:8080/users").then(response => {
            setUsers(response.data)
        }).catch(console.log)

        axios.get("http://localhost:8080/users/roles").then(response => {
            setRoles(response.data)
        }).catch(
            axios.get("http://localhost:8080/users/refresh").then(response => {
                refresh(response.data)
            })
        )
        
        axios.get("http://localhost:8080/products").then(response => {
            setProducts(response.data)
        }).catch(console.log)

        axios.get("http://localhost:8080/products/categories").then(response => {
            setCategories(response.data)
        }).catch(console.log)

    }, []);

    return (
        <>
        <NavBar />
        <div className="container">
            <div className="row">
	            <div className="col-lg-12">
		            <div className="main-box clearfix">
			            <div className="table-responsive">
				            <table className="table user-list">
					            <thead>
						            <tr>
							            <th><span>User</span></th>
							            <th><span>Email</span></th>
							            <th><span>First Name</span></th>
							            <th><span>Last Name</span></th>
							            <th>&nbsp;</th>
						            </tr>
					            </thead>
					            <tbody>
						            {users.map(user => <User key={user.id} user={user} roles={roles} />)}
					            </tbody>
				            </table>
			            </div>
		            </div>
	            </div>
            </div>
        </div>
        
        <hr className="h-25"/>

        <div className="container">
            <div className="row">
	            <div className="col-lg-12">
		            <div className="main-box clearfix">
			            <div className="table-responsive">
				            <table className="table user-list">
					            <thead>
						            <tr>
							            <th><span>Name</span></th>
							            <th><span>Price</span></th>
							            <th><span>Description courte</span></th>
							            <th><button type="button" class="btn btn-success" data-bs-dismiss="modal">Ajouter</button></th>
						            </tr>
					            </thead>
					            <tbody>
						            {products.map(product => <Product key={product.id} product={product} categories={categories} />)}
					            </tbody>
				            </table>
			            </div>
		            </div>
	            </div>
            </div>
        </div>
        </>
    );
}


function User({user, roles}) {

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [lastName, setLastName] = useState(user.lastName)
    const [firstName, setFirstName] = useState(user.firstName)
    const [role, setRole] = useState(user.roles)

    function cancel() {
        setUsername(user.username)
        setEmail(user.email)
        setLastName(user.lastName)
        setFirstName(user.firstName)
        setRole(user.roles)
    }

    function update() {
        axios.put(`http://localhost:8080/users/update/${user.username}`, {username, email, lastName, firstName, roles: role}).then(response => {
            user.username = username;
        }).catch(console.log)
    }

    return (
        <>
        <tr>
			<td className="align-middle">
                <blockquote class="blockquote">
                    {username}
                </blockquote>
                <figcaption class="blockquote-footer">
                    {role}
                </figcaption>
            </td>
            <td className="align-middle">
                {email}
            </td>
			<td className="align-middle">
				<span className="label label-default">{lastName}</span>
			</td>
			<td className="align-middle">
				<span>{firstName}</span>
			</td>
			<td style={{"width": "20%"}} className="align-middle">
                <button type="button" className="btn btn-primary me-md-3" data-bs-toggle="modal" data-bs-target={`#${username}`}>
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button type="button" className="btn btn-danger me-md-3">
                    <i className="bi bi-trash-fill"></i>
                </button>
			</td>
		</tr>

        <div class="modal fade" id={username} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modifier le profil</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form className="needs-validation" noValidate="" autoComplete="off">
						    <div className="mb-3">
								<label className="mb-2 text-muted" htmlFor="username">Username</label>
							    <input id="username" type="text" className="form-control" name="username" value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
							</div>

							<div className="mb-3">
								<div className="mb-2 w-100">
									<label className="text-muted" htmlFor="password">Email</label>
								</div>
								<input id="email" type="email" className="form-control" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
							</div>

                            <div className="mb-3">
								<label className="mb-2 text-muted" htmlFor="lastname">Last Name</label>
							    <input id="lastname" type="text" className="form-control" name="lastname" value={lastName} onChange={e => setLastName(e.target.value)} required autoFocus />
							</div>

                            <div className="mb-3">
								<label className="mb-2 text-muted" htmlFor="firstname">First Name</label>
							    <input id="firstname" type="text" className="form-control" name="firstname" value={firstName} onChange={e => setFirstName(e.target.value)} required autoFocus />
							</div>

                            <div className="mb-3">
                                <label className="mb-2 text-muted" htmlFor="firstname">Role</label>
                                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="inputGroupSelect01" onChange={e => setRole(e.target.value)}>
                                    {roles.map(Arole => <option key={Arole} value={Arole} selected={role.includes(Arole)} >{Arole}</option>)}
                                </select>
                            </div>

						</form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={cancel}>Fermer</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={update}>Enregistrer</button>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
    
}

function Product({product, categories}) {

    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [shortDescription, setShortDescription] = useState(product.shortDescription)
    const [category, setCategory] = useState(product.categories)
    const [description, setDescription] = useState()
    function cancel() {
        setName(product.name)
        setPrice(product.price)
        setShortDescription(product.shortDescription)
        setCategory(product.categories)
        setDescription()
    }

    function update() {
        axios.put(`http://localhost:8080/products/update/${product.id}`, {name, price, shortDescription, categories: {category}, description}).then(_ => {
            console.log("ok")
        }).catch(console.log)
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/products/${product.id}`).then(response => {
            const defaultDescription = response.data.description
            setDescription(response.data.description)
        }).catch(console.log)
    }, [])

    return (
        <>
        <tr>
			<td className="align-middle">
                <blockquote class="blockquote">
                    {name}
                </blockquote>
                <figcaption class="blockquote-footer">
                    {category}
                </figcaption>
            </td>
            <td className="align-middle">
                {price}
            </td>
			<td className="align-middle">
				<span>{shortDescription}</span>
			</td>
			<td style={{"width": "20%"}} className="align-middle">
                <button type="button" className="btn btn-primary me-md-3" data-bs-toggle="modal" data-bs-target={`#${product.id}`}>
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button type="button" className="btn btn-danger me-md-3">
                    <i className="bi bi-trash-fill"></i>
                </button>
			</td>
		</tr>

        <div class="modal fade" id={product.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modifier l'article</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form className="needs-validation" noValidate="" autoComplete="off">

                            <div className="mb-3">
								<div className="mb-2 w-100">
									<label className="text-muted" htmlFor="name">Nom</label>
								</div>
								<input id="name" type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)} required />
							</div>
                            <div className="mb-3">
								<div className="mb-2 w-100">
									<label className="text-muted" htmlFor="price">Prix</label>
								</div>
								<input id="price" type="text" className="form-control" name="price" value={price} onChange={e => setPrice(e.target.value)} required />
							</div>
                            <div className="mb-3">
								<div className="mb-2 w-100">
									<label className="text-muted" htmlFor="shortDescription">Description courte</label>
								</div>
								<input id="shortDescription" type="text" className="form-control" name="shortDescription" value={shortDescription} onChange={e => setShortDescription(e.target.value)} required />
							</div>

                            <div className="mb-3">
                                <label className="mb-2 text-muted" htmlFor="firstname">Catégorie</label>
                                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="inputGroupSelect01" onChange={e => setCategory(e.target.value)}>
                                    {categories.map(Acategory => <option key={Acategory} value={Acategory} selected={category.includes(Acategory)} >{Acategory}</option>)}
                                </select>
                            </div>

                            <div class="form-floating">
                                <textarea class="form-control" id="floatingTextarea2" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                                <label for="floatingTextarea2">Description</label>
                            </div>

						</form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={cancel}>Fermer</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={update}>Enregistrer</button>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
    
}