import React , { useState, useContext }from "react";
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const My_account =() =>{
     // onchange states
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);

    // submit state
    const [excelData, setExcelData] = useState(null);
// onchange event
    const handleFile=(e)=>{
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&fileTypes.includes(selectedFile.type)){
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(e)=>{
                setExcelFile(e.target.result);
                }
        }
        else{
            setTypeError('Please select only excel file types');
            setExcelFile(null);
        }
        }
        else{
            console.log('Please select your file');
        }
        
    }

    const handleFileSubmit=(e)=>{
        e.preventDefault();
        if(excelFile!==null){
          const workbook = XLSX.read(excelFile,{type: 'buffer'});
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          sendFileBack(data);
          
        }
      }
    
    const sendFileBack = async (data) =>{
        console.log("archivo con data",data)
        try{
            const response = await fetch(process.env.BACKEND_URL + "/api/handle_user_data" , {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body : JSON.stringify(data),
            });
            if (response.status == 201){
                alert("se cargo con exito la informacion de los usuarios");
            } else{
                alert("no se cargo el archivo")
                throw new Error(response.status)
            }

        }
        catch(error) {
            console.log(error)
        }
    }



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
                {/*<input type="file" className="form-control" id="avatar" name="avatar" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleChange}/>*/}
                <div className="wrapper">

      <h3>Upload & View Excel Sheets</h3>

      {/* form */}
      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input type="file" className="form-control" required onChange={handleFile} />
        <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
        {typeError&&(
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>

      {/* view data */}
      <div className="viewer">
        {excelData?(
          <div className="table-responsive">
            <table className="table">

              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key)=>(
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((individualExcelData, index)=>(
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key)=>(
                      <td key={key}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ):(
          <div>No File is uploaded yet!</div>
        )}
      </div>

    </div>
            </div>
        </div>
    );
};