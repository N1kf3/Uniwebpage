import React , { useState, useContext,useEffect }from "react";
import * as XLSX from 'xlsx';
import { Upload_files } from "../component/uploadFiles.jsx";
import { Upload} from "../component/upload.jsx";
import { Link ,useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const MyAccount =() =>{
    const [view, setView] = useState(0);    
    const { actions, store } = useContext(Context); 
    const navigate = useNavigate();

    useEffect(() => {
        if (store.jwt_token == null) {
            alert("Por favor inicia sesión con tus credenciales de usuario")
            navigate("/");
            return;
        }
        else{
            actions.getProfile();
        }
    }, [store.jwt_token]);

    const LoadPage = (num) => {
        setView(num);
      };
    const LoadPage2 = (view) => {
        if( view == 1){
            return(
                <Upload_files/>
            )
        }
        if ( view == 2){
            return(
                <Upload/>
            )
        }

    };

    return (
        <div>
            {store.jwt_token ? (
                <div className="d-flex container">
                    <div className="mx-5">
                        <div>
                            icono o foto del usuario<br/>
                            {store.user ? (<div>        
                            <h6>Nombre y apellido: 
                            {" "+ store.user.name} { store.user.last_name}</h6>
                            <h6>Cedula: {store.user.user_ID}</h6>
                            <h6>Carrera: {store.user.career}</h6>
                            </div>):(<div> Loading...</div>)}
                        </div>
                        <div>
                            <strong>
                                array de botones con funciones
                            </strong>
                            {store.user ? 
                                store.user.career == "admin"? (
                                <div className="d-flex flex-column">
                                    <button type="submit" className="btn btn-primary mt-3" onClick={(e) => LoadPage(1)} >Carga de Data de los usuarios</button>
                                    <button type="submit" className="btn btn-primary mt-3" onClick={(e) => LoadPage(2)} >Cargar materias </button>                               
                                </div> 
                            ):(
                                <div className="d-flex flex-column">
                                    <button type="submit" className="btn btn-primary mt-3"  >Inscribir semestre</button>
                                    <button type="submit" className="btn btn-primary mt-3"  >Ver historial de materias </button>                               
                                </div> 
                            )
                            :(<div> Loading...</div>)}                                               
                        </div>
                    </div>
                    <div>
                        {view == 0 ? <p>elem 2 </p> :LoadPage2(view)}
                    </div>            
                </div>
            ):(<div>informacion confidencial</div>)}
        </div>
    );
};