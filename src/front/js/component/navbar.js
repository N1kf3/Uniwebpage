import React , {useEffect,useContext, useState}from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logoImageUrl from "../../img/2.jpg";

export const Navbar = () => {
	const { actions, store } = useContext(Context); 
	const [viewInfo , getViewInfo] = useState(0)
	useEffect(() => {
        if (store.jwt_token != null) {
            getViewInfo(1)
        }
    }, [store.jwt_token]);

	const signout=(view)=>{
	
		localStorage.removeItem("jwt_token");
		store.jwt_token= null;
		store.user=null;
		getViewInfo(view)
	}
	return (
		<nav className="navbar navbar-light bg-white">
			<div className="container">
				<Link to={viewInfo == 0 ? "/": "/my_account"}>
					<span className="navbar-brand mb-0">
					<img src={logoImageUrl} className="w-50 me-2" alt="..."/>  
					</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className={`btn btn-outline-success ${viewInfo == 0 ? "": "none-button"}`} id="sign-up">Crear Cuenta</button>
					</Link>
					<Link to="/">					
						<button className={`btn btn-outline-secondary ${viewInfo == 1 ? "": "none-button"}`} id="sign-out" onClick={(e)=>signout(0) }>Cerrar Sesion</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
