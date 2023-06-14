import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="mt-5 container d-flex justify-content-evenly ">
			<div>
				uni LOGO
			</div>
			<form>
				<div className="mb-3">
					<label for="exampleInputEmail1" className="form-label">Cedula de identidad</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>					
				</div>
				<div className="mb-3">
					<label for="exampleInputPassword1" className="form-label">Contraseña</label>
					<input type="password" className="form-control" id="exampleInputPassword1"/>
				</div>
				<Link to='/my_account'>
				<button type="submit" className="btn btn-primary">Iniciar Sesion</button>
				</Link>
			
			</form>
		</div>
	);
};
