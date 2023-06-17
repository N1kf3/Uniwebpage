import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Signin } from "../component/signin.jsx";
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
			<Signin/>
			
		</div>
	);
};
