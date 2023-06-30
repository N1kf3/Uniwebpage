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
        <div className="mx-5"> 
            <h3 className="border-bottom"> Deshabilitar Estudiante</h3>
            <div className="input-group my-3">
                <input type="text" className="form-control" placeholder="Ingrese numero de cedula de identidad" aria-label="Ingrese numero de cedula de identidad" aria-describedby="button-addon2" onChange={(e)=>getstudent(e.target.value)}/>
                <button className="btn btn-outline-secondary ms-2" type="button" id="button-addon2" onClick={(e) => findStudent()}>Buscar estudiante</button>
            </div> 
            <div className="mt-4">
                {studentInfo ?(<div>
                    El usuario se encuentra {studentInfo.is_active?("Habilitado"):("Deshabilitado")} {`=>`}
                    <button type="submit" className={`ms-5 btn  btn-sm  ${studentInfo.is_active?("  btn-danger"):("btn-primary")}`}  onClick={(e) => disablestudent()}  >{studentInfo.is_active?("  Deshabilitar"):("Habilitar")} </button>
                    </div>):("")}
            </div>
        </div>
        
    )
}