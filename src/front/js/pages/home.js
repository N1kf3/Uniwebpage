import React, { useContext } from "react";
import { Signin } from "../component/signin.jsx";
import uniImageUrl from "../../img/will.jpg";
import "../../styles/home.css";



export const Home = () => {
	

	return (
		<div className="mt-auto container d-flex justify-content-center ">
			
			<img src={uniImageUrl} className="w-25 me-2" alt="..."/>       
			
			<Signin/>
			
		</div>
	);
};
