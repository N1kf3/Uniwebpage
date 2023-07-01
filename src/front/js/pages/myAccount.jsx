import React , { useState, useContext,useEffect }from "react";
import * as XLSX from 'xlsx';
import { Upload_files } from "../component/uploadFiles.jsx";
import { Upload} from "../component/upload.jsx";
import { Enroll} from "../component/enroll.jsx";
import { UpdateGrades} from "../component/updategrades.jsx";
import { SignatureHistory} from "../component/signaturehistory.jsx";
import { DropSignature} from "../component/dropsignature.jsx";
import { DropStudent} from "../component/dropstudent.jsx";
import { Link ,useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";
import userImageUrl from "../../img/user.png";
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
            if (store.user == null){
                actions.getProfile();
                console.log('entra al privado')
                fetchSubject()
            }
        }
    }, [store.jwt_token]);

    const LoadPage = (num) => {
        setView(num);
      };



    const fetchSubject = async ()=>{
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
                store.user_Sig = resp.subject                                                  
            }else{
                throw new Error(response.status)
            }
        }
        catch(error){
            console.log(error)
        }
    }
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
        if ( view == 3){
            return(
                <UpdateGrades/>
            )
        }
        if ( view == 4){
            return(
                <Enroll/>
            )
        }
        if ( view == 5){
            return(
                <SignatureHistory/>
            )
        }
        if ( view == 6){
            return(
                <DropSignature/>
            )
        }
        if ( view == 7){
            return(
                <DropStudent/>
            )
        }

    };

    const sortSignatures=()=>{
        let arr =[]
        for (let i=0;i<store.user.materia.length;i++){
            if (store.user.materia[i].notas == "0"){
                arr.push(store.user.materia[i])
            }
        }
        store.dropArr=arr
        console.log(arr)
    }

    return (
        <div className="">
            {store.jwt_token ? (
                <div className="d-flex container my-5 ">
                    <div className="mx-5 border p-5 w-25 bg-white">
                        <div>
                            <img src={userImageUrl} className="img-thumbnail h-25 mb-2" alt="..."/>                            
                            {store.user ? (
                            <div>   
                                <p className="mb-1">
                                    <strong>Nombre y apellido:</strong> <br/>
                                    {" "+ store.user.name} { store.user.last_name}
                                </p>
                                <p className="mb-1">
                                    <strong>Cedula:</strong> <br/>
                                    {store.user.user_ID}
                                </p>
                                <p className="mb-1">
                                    <strong>Carrera:</strong> <br/>
                                    {store.user.career}
                                </p>
                            </div>):(<div> Loading...</div>)}
                        </div>
                        <div>
                            {store.user ? 
                                store.user.career == "admin"? (
                                <div className="d-flex flex-column">
                                    <button type="submit" className="btn btn-primary mt-3 btn-sm" onClick={(e) => LoadPage(1)} >Carga de Data de los usuarios</button>
                                    <button type="submit" className="btn btn-primary mt-3 btn-sm" onClick={(e) => LoadPage(2)} >Cargar Materias </button>                               
                                    <button type="submit" className="btn btn-primary mt-3 btn-sm" onClick={(e) => LoadPage(3)} >Cargar Notas </button>
                                    <button type="submit" className="btn btn-primary mt-3 btn-sm" onClick={(e) => LoadPage(7)} >Deshabilitar estudiante </button>
                                </div> 
                            ):(
                                <div className="d-flex flex-column">
                                    <button type="submit" className="btn btn-primary mt-3 btn-sm" onClick={(e) => LoadPage(4)}  >Inscribir Semestre</button>
                                    <button type="submit" className="btn btn-primary mt-3 btn-sm"  onClick={(e) => LoadPage(5)}  >Historial de materias </button>                               
                                    <button type="submit" className="btn btn-primary mt-3 btn-sm"  onClick={(e) => {LoadPage(6);sortSignatures()}}  >Retirar Materia </button>                               
                                </div> 
                            )
                            :(<div> Loading...</div>)}                                               
                        </div>
                    </div>
                    <div className="container border py-5 bg-white">
                        {view == 0 ? (""):LoadPage2(view)}
                    </div>            
                </div>
            ):(<div>informacion confidencial</div>)}
        </div>
    );
};