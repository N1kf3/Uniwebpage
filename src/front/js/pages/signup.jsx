import React , { useContext, useState }from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Signup =() =>{
    const [userID,getUserID]= useState(null);
    const [user, getUser] = useState(null);
    const [viewInfo, getViewInfo] = useState(0);

    const check_ID = async (userID)=>{
        event.preventDefault();
        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/check_ID" , {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({"Cedula":userID}),
        });
        if (response.status == 201){
            alert("se cargo con exito la informacion de los usuarios");
            let usuario = await response.json()
            getUser(usuario)
            getViewInfo(1)
        } else{
            alert("no se cargo el archivo")
            throw new Error(response.status)
        }

        }
        catch(error){
            console.log(error)
        }

    }







    return (
        <div className="container mt-5">  
            <form>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label" >Cedula de identidad</label>
					<input type="number" className="form-control" id="exampleInputcedula" onChange={(e)=>{getUserID(e.target.value)}}/>					
				</div>
                	
				<button type="submit" className={`btn btn-primary ${viewInfo == 0? "": "none-button"}`} onClick={(e)=>{check_ID(userID)}}>Buscar</button>
                <div className={` ${viewInfo == 1 ? "": "none-button"}`}>
                    <label htmlFor="exampleInputEmail1" className="form-label"  >Nombre</label>
                    <input type="text" className="form-control" id="exampleInputcedula" value={user == null ? " " : user.nombre} readOnly/>	
                    <label htmlFor="exampleInputEmail1" className="form-label" >Apellido</label>
                    <input type="text" className="form-control" id="exampleInputcedula" value={user == null ? " " : user.apellido} readOnly/>	
                    <label htmlFor="exampleInputEmail1" className="form-label" >Carrera</label>
                    <input type="text" className="form-control" id="exampleInputcedula" value={user == null ? " " : user.carrera} readOnly/>
                    <label htmlFor="exampleInputEmail1" className="form-label" >Correo electronico</label>	
                    <input type="email" className="form-control" id="exampleInputcedula" />
                    <label htmlFor="exampleInputEmail1" className="form-label" >Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputcedula" />
                    <button type="submit" className="btn btn-primary mt-3">Crear cuenta</button>
                </div>
			</form>
            
        </div>
    );
};