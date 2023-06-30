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
                    if (resp.user.materia[i].notas != 'RET'){
                        if (resp.user.materia[i].notas ==0){
                            materiasMas.push(resp.user.materia[i])
                        }                    
                    }
                }                              
                getSubjectClean(materiasMas)
                getStudenSubject(resp.user)
                getShowList(1)               
            }else{
                getShowList(null) 
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
        <div className="mx-5">
            <h3 className="border-bottom"> Cargar notas</h3>             
            <div className="input-group my-3">
                <input type="text" className="form-control" placeholder="Ingrese numero de cedula de identidad" aria-label="Ingrese numero de cedula" aria-describedby="button-addon2" onChange={(e)=>getstudent(e.target.value)}/>
                <button className="btn btn-outline-secondary ms-2" type="button" id="button-addon2" onClick={(e) => findStudent()}>Buscar estudiante</button>
            </div>        
            <div className="d-flex mt-5">
                {!showList ? (""):(
                    <div className="d-flex">  
                        <div className="border-end pe-4">
                            <h5>Datos del estudiante</h5>
                            <h6>Nombre: </h6>
                            <label htmlFor="exampleInputEmail1" className="form-label"  >{studenSubject.name} {studenSubject.last_name}</label>
                            <h6>Cedula: </h6>
                            <label htmlFor="exampleInputEmail1" className="form-label"  >{studenSubject.user_ID} </label>
                        </div>
                   
                        <ul className="list-group list_bullet ms-5 border-end pe-4 rounded-0" >                
                            {!showList ? ("")
                                        : subjectClean.length == 0? (<div>No hay materias inscritas</div>):
                                        (subjectClean.map((sig,index)=>                            
                                            <li htmlFor="check" className="d-flex justify-content-between mb-2" key={index} id={index} >
                                                <span>{sig.codigo}-{sig.materias}</span>     
                                                <input type="text" className="form-control w-25 py-0" id={index}  defaultValue={sig.notas} onChange={(e)=>changeGrade(e.target.id,e.target.value)} />	                                                           
                                            </li>                                                      
                                        ))}   
                        </ul>
                        <button type="submit" className="btn btn-primary ms-3 h-25"  onClick={(e) => uploadGrades()}  >Cargar notas </button>   
                    </div>)} 
            </div>


            
        </div>


    )







}


