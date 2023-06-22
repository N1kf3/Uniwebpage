import React , { useContext, useEffect, useState }from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";



export const UpdateGrades =()=>{
    const [student, getstudent ] = useState()
    const [studenSubject, getStudenSubject] = useState()
    const [showList , getShowList] = useState(null)
    const [subjectClean, getSubjectClean]=useState([])

    const findStudent = async()=>{
        console.log(student)
        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/get_student" ,{
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    'Accept': '*/*'
                },
                body: JSON.stringify(
                    {"cedula": student}
                )
            })
            if (response.status == 201){
                let resp = await response.json()
                let materiasMas = []                         
                for (let i=0;i<resp.user.materia.length;i++){
                    if (resp.user.materia[i].notas ==0){
                        materiasMas.push(resp.user.materia[i])
                    }                    
                }                              
                getSubjectClean(materiasMas)
                getStudenSubject(resp.user)
                getShowList(1)               
            }else{
                alert('usuario no registrado')
                throw new Error(response.status)
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    const changeGrade =(index,grade)=>{
        let arr = subjectClean;
        arr[index].notas = grade
        console.log(arr)
        getSubjectClean(arr)
    }

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
            }else{
                alert("hubo un error al cargar las notas")
                throw new Error(response.status)
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <div>
            <h3> Cargar notas</h3>
            
        
            con un boton actualizar el registro de materias (Studen_grade)

            <label htmlFor="exampleInputEmail1" className="form-label"  >Ingrese nuemro de cedula</label>
            <div className="d-flex">
                <input type="text" className="form-control" id="exampleInputcedula" onChange={(e)=>getstudent(e.target.value)}  />	
                <button type="submit" className="btn btn-primary"  onClick={(e) => findStudent()}  >Buscar estudiante </button>                               
            </div>
            <div className="d-flex ">
                {!showList ? (""):(
                    <div className="d-flex ">  
                        <div>

                        <h5>Datos del estudiante</h5>
                        <h6>Nombre: </h6>
                        <label htmlFor="exampleInputEmail1" className="form-label"  >{studenSubject.name} {studenSubject.last_name}</label>
                        <h6>Cedula: </h6>
                        <label htmlFor="exampleInputEmail1" className="form-label"  >{studenSubject.user_ID} </label>
                        </div>
                   
                <ul className="list-group list_bullet ms-5" >                
                    {!showList ? ("")
                                : subjectClean.length == 0? (<div>No hay materias inscritas</div>):
                                (subjectClean.map((sig,index)=>                            
                                    <li htmlFor="check" className="d-flex justify-content-between" key={index} id={index} >
                                        <span>{sig.codigo}-{sig.materias}</span>     
                                        <input type="number" className="form-control w-25" id={index}  defaultValue={sig.notas} onChange={(e)=>changeGrade(e.target.id,e.target.value)} />	                                                           
                                    </li>                                                      
                                ))}   
                </ul>
                <button type="submit" className="btn btn-primary ms-3"  onClick={(e) => uploadGrades()}  >Cargar notas </button>   </div>)} 
            </div>


            
        </div>


    )







}


