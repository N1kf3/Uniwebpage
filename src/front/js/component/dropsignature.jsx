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

    const updateArrAdd=(id)=>{        
        getUpdatedSig(updatedSig => [...updatedSig, store.dropArr[id]])    
    }
    const updateArrDelete=(code)=>{    
        getUpdatedSig( updatedSig.filter((item,index)=>{
            if (item.codigo != code){
                return item
            }
        }))   
    }

    const uploadDrop=async()=>{
        console.log(updatedSig)
        if (updatedSig.length>0){
            let arr = updatedSig
            for (let i=0; i< arr.length;i++){
                arr[i].notas='RET'
            }
            try {
                const response = await fetch( process.env.BACKEND_URL + "/api/update_subject/"+store.user.user_ID,{
                    method:'POST',
                    headers: {
                        "Content-Type":"application/json"                
                    } ,
                    body : JSON.stringify(arr)
                });
                if (response.status==201){
                    alert("Se cargaron las notas con exito")
                }else{
                    alert("Hubo un error al cargar las notas")
                    throw new Error(response.status)
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            alert("Debe seleccionar alguna materia a retirar")
        }
    }

    return(
        <div className="container"> 
            <h5>Retirar materias</h5>
            <label htmlFor="exampleInputEmail1" className="form-label mt-4"  >Selecione las materias que desea retirar</label>
            <ul className="list-group list_bullet" >     
            {!store.dropArr?(<div>Cargando...</div>):(store.dropArr.map((sig,index)=>                            
                                    <li htmlFor="check" className="form-check form-switch" key={index} id={index} >                                        
                                        <input className="form-check-input" type="checkbox" role="switch" id={index} onChange={(e)=>{e.target.checked ? (updateArrAdd(e.target.id)):(updateArrDelete(sig.codigo))}   }/>
                                        <span>{sig.codigo}-{sig.materias}</span>   
                                    </li>                                                      
                                ))}
            </ul>
            <button type="submit" className="btn btn-success btn-md mt-3 " onClick={(e)=>uploadDrop()} >
                        Retirar materia
            </button>
        </div>
    )
}