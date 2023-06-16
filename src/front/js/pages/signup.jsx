import React , { useContext, useState }from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Signup =() =>{
    const [userID,getUserID]= useState(null);
    const [user, getUser] = useState(null);
    const [userEmail, getUserEmail] = useState(null);
    const [userPass, getUserPass] = useState(null);
    const [viewInfo, getViewInfo] = useState(0);
    const [inputDesable, getInputDesable] = useState(false)

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
            let usuario = await response.json()
            getUser(usuario)
            getInputDesable(true)
            getViewInfo(1)
        } else{
            alert("Informacion del usuario no se encuentra en la base de datos")
            
            throw new Error(response.status)
        }}
        catch(error){
            console.log(error)
        }
    }

    const signup = async (event)=>{
        event.preventDefault();
        const userBody ={
            nombre : user.nombre,
            apellido : user.apellido,
            cedula : userID,
            carrera : user.carrera,
            email: userEmail,
            password : userPass
        }
        console.log(userBody)
        try{
            const response = await fetch(process.env.BACKEND_URL + "/api/signup" , {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body : JSON.stringify(userBody)
            });
            if (response.status == 201){
                alert('usuario creado con exito')

            }else {
                let usuario = await response.json()            
                alert(usuario.Error)
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
				<div className="">
					<label htmlFor="exampleInputEmail1" className="form-label" >Cedula de identidad</label>
					<input type="number" className="form-control" id="exampleInputcedula" onChange={(e)=>{getUserID(e.target.value)}} disabled={inputDesable}/>					
				</div>
                	
				<button type="submit" className={`btn btn-primary mt-3 ${viewInfo == 0? "": "none-button"}`} onClick={(e)=>{check_ID(userID)}}>Buscar</button>
                <div className={` ${viewInfo == 1 ? "": "none-button"}`}>
                    <label htmlFor="exampleInputEmail1" className="form-label"  >Nombre</label>
                    <input type="text" className="form-control" id="exampleInputcedula" value={user == null ? " " : user.nombre} disabled />	
                    <label htmlFor="exampleInputEmail1" className="form-label" >Apellido</label>
                    <input type="text" className="form-control" id="exampleInputcedula" value={user == null ? " " : user.apellido} disabled />	
                    <label htmlFor="exampleInputEmail1" className="form-label" >Carrera</label>
                    <input type="text" className="form-control" id="exampleInputcedula" value={user == null ? " " : user.carrera} disabled />
                    <label htmlFor="exampleInputEmail1" className="form-label" >Correo electronico</label>	
                    <input type="email" className="form-control" id="exampleInputcedula" onChange={(e)=>{getUserEmail(e.target.value)}} />
                    <label htmlFor="exampleInputEmail1" className="form-label" >Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputcedula" onChange={(e)=>{getUserPass(e.target.value)}}/>
                    <button type="submit" className="btn btn-primary mt-3" onClick={signup}>Crear cuenta</button>
                </div>
			</form>
            
        </div>
    );
};