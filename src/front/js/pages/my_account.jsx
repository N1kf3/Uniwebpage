import React , { useContext }from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const My_account =() =>{
    return (
        <div className="d-flex container">
            <div className="mx-5">
                <strong>
                    info usuario y botones 
                </strong>
                <div>
                    icono o foto del usuario<br/>
                    <span>Nombre del usuario</span> <br/>
                    <span>Cedula del usuario</span><br/>
                    <span>Carrera del usuario</span>
                </div>
                <div>
                    <strong>
                        array de botones con funciones
                    </strong>
                    <div className="d-flex flex-column">
                        <button type="submit" className="btn btn-primary mt-3">Iniciar Sesion</button>
                        <button type="submit" className="btn btn-primary mt-3">Iniciar Sesion</button>
                        <button type="submit" className="btn btn-primary mt-3">Iniciar Sesion</button>
                        <button type="submit" className="btn btn-primary mt-3">Iniciar Sesion</button> 
                    </div>

                </div>
            </div>
            <div className="mx-5">
                <strong>
                    info de lo selecionado
                </strong>
            </div>
        </div>
    );
};