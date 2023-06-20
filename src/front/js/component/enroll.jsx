import React , { useContext, useEffect, useState }from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Enroll =()=>{
    const { actions, store } = useContext(Context); 
    const [signatures, getSignatures]= useState([]);

    useEffect(() => {
        console.log(store.user)
        
    });
    const fetchSignature = async ()=>{
        try{
            const response = await fetch(process.env.BACKEND_URL + "/api/handle_info", {           
                method:"GET", 
                headers: {
                    "Content-Type":"application/json",
                    'Accept': '*/*'
                }                
            })
            if (response.status == 201){
                let resp = await response.json()
                getSignatures(resp.signature)
 
            }
        }
        catch(error){
            console.log(error)
        }
    }
    const LoadPage=()=>{
        fetchSignature()
    }

    const showList=()=>{
        console.log(signatures[1])
           

    }

    return(
        <div>
            inscribir materia
            <button type="submit" className="btn btn-primary mt-3" onClick={(e) => LoadPage()}  >preuba</button>
            <button type="submit" className="btn btn-primary mt-3" onClick={(e) => showList()}  >preuba</button>
            <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                <option defaultValue={"Semestre"}>Semestre</option>
                {!signatures ? (<div> Loading...</div>)
                :(
                    signatures.map(sig=>
                    <option value={sig.semestre} key={sig.codigo}>{sig.materias}</option>

                ))}
                
            </select>

        </div>
    )


}