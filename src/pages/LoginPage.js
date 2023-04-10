import React, { useState } from "react";

import { setAuthToken } from "../helpers/setAuthToken";
import axios from "axios";
import { Link } from "react-router-dom";

import ErrorBox from "../components/ErrorBox";

function LoginPage() {

    window.scrollTo(0,0);
	const [error, setError] = useState(false);

    const handleSubmit = event => {

		event.preventDefault();

        const form = event.currentTarget;

        const username = form.elements.username.value;
        const password = form.elements.password.value;

        delete axios.defaults.headers.common["Authorization"];

        axios.post("http://localhost:8080/users/signin", {username, password})
          .then(response => {
            const token = response.data;
            localStorage.setItem("token", token);
            setAuthToken(token);
            window.location.href = '/'
          })
          .catch(err => {
			setError(err.response.data.message)
		  });
      };

    return (
		<>
		{error ? <ErrorBox message={error} /> : null}
        <section className="h-100">
		<div className="container h-100">
			<div className="row justify-content-sm-center h-100">
				<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
					<div className="text-center my-5">
						<img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="logo" width="100"/>
					</div>
					<div className="card shadow-lg">
						<div className="card-body p-5">
							<h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
							<form className="needs-validation" noValidate="" autoComplete="off" onSubmit={handleSubmit}>
								<div className="mb-3">
									<label className="mb-2 text-muted" htmlFor="username">E-Mail ou Username</label>
									<input id="username" type="text" className="form-control" name="username" required autoFocus />
								</div>

								<div className="mb-3">
									<div className="mb-2 w-100">
										<label className="text-muted" htmlFor="password">Mot de passe</label>
									</div>
									<input id="password" type="password" className="form-control" name="password" required />
								</div>

								<div className="d-flex align-items-center">
									<button type="submit" className="btn btn-primary ms-auto">Login</button>
								</div>
							</form>
						</div>
						<div className="card-footer py-3 border-0">
							<div className="text-center">Pas de compte ? <Link to="/register" className="text-dark">S'inscrire</Link></div>
						</div>
					</div>
					<div className="text-center mt-5 text-muted">
						Copyright &copy; 2023-2023 &mdash; AmazonLike
					</div>
				</div>
			</div>
		</div>
	</section>
	</>
    );
}

export default LoginPage