import React from "react";

export default function ErrorBox({message}) {
    return (
		<div className="alert alert-danger" role="alert">
		    {message}
		</div>
    );
}