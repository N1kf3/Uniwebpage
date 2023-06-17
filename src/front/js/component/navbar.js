import React , {useEffect,useContext, useState}from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions, store } = useContext(Context); 
	const [viewInfo , getViewInfo] = useState(0)
	useEffect(() => {
        if (store.jwt_token != null) {
            getViewInfo(1)
        }
    }, [store.jwt_token]);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Nombre de la Universidad (LOGO)</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className={`btn btn-primary ${viewInfo == 0 ? "": "none-button"}`} id="sign-up">Crear Cuenta</button>
					</Link>
					<Link to="/">					
						<button className={`btn btn-primary ${viewInfo == 1 ? "": "none-button"}`} id="sign-out" onClick={actions.removeToken}>Cerrar Sesion</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
