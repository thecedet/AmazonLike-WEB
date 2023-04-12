import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

export default function AdminPage() {
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
						            <User />
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


function User() {
    return (
        <tr>
			<td className="align-middle">
                <span>Mila Kunis</span>
                <span class="user-subhead">Admin</span>
            </td>
            <td className="align-middle">
                2013/08/08
            </td>
			<td className="align-middle">
				<span className="label label-default">Inactive</span>
			</td>
			<td className="align-middle">
				<span>mila@kunis.com</span>
			</td>
			<td style={{"width": "20%"}}>
                <button type="button" className="btn btn-primary me-md-3">
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button type="button" className="btn btn-danger me-md-3">
                    <i className="bi bi-trash-fill"></i>
                </button>
			</td>
		</tr>
    );
}