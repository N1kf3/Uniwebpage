import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Nombre de la Universidad (LOGO)</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary" id="sign-up">Crear Cuenta</button>
					</Link>
					<Link to="/">					
						<button className="btn btn-primary" id="sign-out">Cerrar Sesion</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
