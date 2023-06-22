import React , { useContext, useEffect, useState }from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const SignatureHistory =()=>{
    const { actions, store } = useContext(Context); 
    const [view, setView] = useState(0);    

    return(
        <div>
            <h2 className="border-bottom">Historial de materias inscritas</h2>
          
            <div className="container mt-5 w-75 text-center">
                <div className="row border-bottom">
                    <div className="col-2">
                    <strong>Codigo</strong>
                    </div>
                    <div className="col">
                    <strong>Materia</strong>
                    </div>
                    <div className="col-2">
                    <strong>Nota</strong>
                    </div>
                </div>
                {!store.user ? (<div display={"none"}>uno</div>)
                :(store.user.materia.map((sig,index)=> 
                    <div className="row border-bottom" key={index}>
                        <div className="col-2">
                        {sig.codigo}
                        </div>
                        <div className="col">
                        {sig.materias}
                        </div>
                        <div className="col-2">
                        {sig.notas}
                        </div>
                    </div>                           
                   ))}  


            </div>
        </div>
    )
}