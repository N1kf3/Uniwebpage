import React , { useContext, useEffect, useState }from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const DropSignature =()=>{
    const { actions, store } = useContext(Context); 
    const [updatedSig,getUpdatedSig]=useState([])

    useEffect(()=>{
       
    })



    const uploadGrades = async()=>{
        try {
            const response = await fetch( process.env.BACKEND_URL + "/api/update_subject/"+studenSubject.user_ID,{
                method:'POST',
                headers: {
                    "Content-Type":"application/json"                
                } ,
                body : JSON.stringify(subjectClean)
            });
            if (response.status==201){
                alert("se cargaron las notas con exito")
                getShowList(null) 
            }else{
                alert("hubo un error al cargar las notas")
                throw new Error(response.status)

            }
            
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <div className="container"> 
            <h5>retirar materias</h5>
            <ul className="list-group list_bullet mt-5" >     
            {!store.dropArr?(<div>Loading...</div>):(store.dropArr.map((sig,index)=>                            
                                    <li htmlFor="check" className="form-check form-switch" key={index} id={index} >                                        
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
                                        <span>{sig.codigo}-{sig.materias}</span>   
                                    </li>                                                      
                                ))}
            </ul>
        </div>
    )
}