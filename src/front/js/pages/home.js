import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Signin } from "../component/signin.jsx";
import uniImageUrl from "../../img/will.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="mt-auto container d-flex justify-content-center ">
			
			<img src={uniImageUrl} className="w-25 me-2" alt="..."/>       
			
			<Signin/>
			
		</div>
	);
};
