import React , { useState, useContext }from "react";
import * as XLSX from 'xlsx';


export const Upload = ()=>{
    // onchange states
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);

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
          console.log(data)
          sendFileBack(data);  
        }
      }
    
    const sendFileBack = async (data) =>{
        try{
            const response = await fetch(process.env.BACKEND_URL + "/api/handle_subject_data" , {
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


    return(
        <div className="mx-5">           
                <div className="wrapper">
                    <h3 className="border-bottom">Cargar materias</h3>

                    <form className="form-group custom-form mt-3" onSubmit={handleFileSubmit}>
                        <div className="input-group">
                            <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" required onChange={handleFile}/>
                            <button className="btn btn-outline-secondary ms-2" type="submit" id="inputGroupFileAddon04">Subir archivo</button>
                        </div>
                        {typeError&&(
                        <div className="alert alert-danger" role="alert">{typeError}</div>
                        )}
                    </form>
                </div>
        </div>
    )

}