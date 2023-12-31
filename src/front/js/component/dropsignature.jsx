import React , { useContext, useEffect, useState }from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const DropSignature =()=>{
    const { actions, store } = useContext(Context); 
    const [updatedSig,getUpdatedSig]=useState([]);
    const [currentSig,getCurrentSig]= useState(store.dropArr);
 




    const updateArrAdd=(id)=>{    
      
        getUpdatedSig(updatedSig => [...updatedSig, store.dropArr[id]])
        getCurrentSig( currentSig.filter((item,index)=>{
            if (item.codigo != store.dropArr[id].codigo){
                return item
            }
        }))     
    }
    const updateArrDelete=(code)=>{    
        getUpdatedSig( updatedSig.filter((item,index)=>{
            if (item.codigo != code){
                return item
            }
        }))   
        for (let i =0; i< store.dropArr.length;i++){
            if(store.dropArr[i].codigo==code){              
                getCurrentSig(currentSig => [...currentSig, store.dropArr[i]])
            }
        }
    }

    const uploadDrop=async()=>{
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
                    store.dropArr=currentSig
                    getUpdatedSig([])
                    alert("Retiro exitoso")
                    
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

    const funcCheck=(codigo)=>{
        for (let i =0; i< updatedSig.length; i++){
            if (updatedSig[i].codigo == codigo)
                return true
        }
        return false
    }

    return(
        <div className="container"> 
            <h2 className="">Retirar materias</h2>
            {!store.dropArr.length ==0? (<div>

                <h5 className="form-label mt-4"> Selecione las materias que desea retirar</h5>           
                <ul className="list-group list_bullet" >     
                {!store.dropArr?(<div>Cargando...</div>):(store.dropArr.map((sig,index)=>                            
                                        <li htmlFor="check" className="form-check form-switch" key={index} id={index} >                                        
                                            <input className="form-check-input" type="checkbox" role="switch" id={index} 
                                            onChange={(e)=>{e.target.checked ? (updateArrAdd(e.target.id)):(updateArrDelete(sig.codigo))}} 
                                            checked={funcCheck(sig.codigo)?(true):(false)}/>
                                            <span>{sig.codigo}-{sig.materias}</span>   
                                        </li>                                                      
                                    ))}
                </ul>
                <button type="submit" className="btn btn-success btn-md mt-3 " onClick={(e)=>uploadDrop()} >
                            Retirar materia
                </button>


            </div>):(<h5>No hay materias a retirar </h5>)}




        </div>
    )
}