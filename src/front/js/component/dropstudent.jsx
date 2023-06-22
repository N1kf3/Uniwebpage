import React , { useContext, useEffect, useState }from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const DropStudent =()=>{
    const [student, getstudent ] = useState()
    const [studentInfo , getStudentInfo] = useState()

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
                getStudentInfo(resp.user)        
           
            }else{
                alert('usuario no registrado')
                throw new Error(response.status)
                
            }
        } catch (error) {
            console.log(error)
        }
    }


    const disablestudent =async ()=>{
        let active = true
        if (studentInfo.is_active){
            active = false
        }
        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/disable_user/"+student ,{
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    'Accept': '*/*'
                },
                body: JSON.stringify(
                    {"is_active":active }
                )
            })
            if (response.status == 201){
                alert('usuario modificado')  
                getStudentInfo()    
           
            }else{
                alert('usuario no registrado')
                throw new Error(response.status)
                
            }
        } catch (error) {
            console.log(error)
        }
    }






    return(
        <div> 
            <h3> Deshabilitar Estudiante</h3>
            
    

            <label htmlFor="exampleInputEmail1" className="form-label"  >Ingrese nuemro de cedula</label>
            <div className="d-flex">
                <input type="text" className="form-control" id="exampleInputcedula" onChange={(e)=>getstudent(e.target.value)}  />	
                <button type="submit" className="btn btn-primary"  onClick={(e) => findStudent()}  >Buscar estudiante </button>                               
            </div>
            <div className="mt-4">
                {studentInfo ?(<div>
                    El usuario se encuentra {studentInfo.is_active?("Habilitado"):("Deshabilitado")}
                    <button type="submit" className="ms-5 btn btn-primary btn-sm"  onClick={(e) => disablestudent()}  >{studentInfo.is_active?("  Deshabilitar"):("Habilitar")} </button>
                    </div>):("")}
            </div>
        </div>
        
    )
}