import React , { useContext, useState }from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signin =() =>{
    const [userID,getUserID] = useState(null)
    const [userPass,getUserPass] = useState(null)
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();



    const tryLogIn = async ()=>{
        event.preventDefault();
        const userBody ={
            cedula: userID,
            password : userPass
        }
        if (userID != null || userPass != null){
            try{
                const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body : JSON.stringify(userBody)
                })
                if (response.status == 200){
                    let resp = await response.json();
                    actions.setToken(resp.jwt_token);                                            
                    navigate("/my_account");
    
                }
                else{
                    let resp = await response.json()            
                    alert(resp.error)
                    throw new Error(response.body)
                }
            }
            catch(error){
                console.log(error)
            }
        }
        else alert("ingrese los datos requeridos")      
    }

return(
    <div className="border p-5 bg-white">
        <form className="d-flex flex-column">
            <div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Cedula de identidad</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>getUserID(e.target.value)}/>					
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>getUserPass(e.target.value)}/>
                </div>
            </div>
				<button type="submit" className=" mx-auto btn btn-primary btn-sm" onClick={tryLogIn}>Iniciar Sesion</button>		
		</form>
    </div>
)


}