import React , { useContext, useEffect, useState }from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Enroll =()=>{
    const { actions, store } = useContext(Context); 
    const [showSig, getShowSig]= useState([]);
    const [codeArr, getCodeArr]= useState([]);
    const [view,getView]= useState(true)
    const [theArray, setTheArray] = useState([]);

    useEffect(() => {
        
        { /*     
        Oowlish
        Revelo
        launchpad technologies
        valatam
        bairesdev
        canonical
        upwork
        gigster*/}

    });

    const control_sig=(materias, materiasData)=>{
        let codesArr=[]
        for (let i =0; i< materias.length; i++ ){
            if (materias[i].notas>= 10)
                codesArr.push(materias[i].codigo)
        }
        let newArr = materiasData.filter(item => !codesArr.includes(item.codigo))
        return (newArr)


    }

    const showList=(tu)=>{
        let filteredSubject= control_sig(store.user.materia , store.user_Sig)
        switch(tu){
            case "Semestre I": 
                tu = "I";
                break;
            case "Semestre II": 
                tu = "II";
                break;
            case "Semestre III": 
                tu = "III";
                break;
            case "Semestre IV": 
                tu = "IV";
                break;
            case "Semestre V": 
                tu = "V";
                break;
            case "Semestre VI": 
                tu = "VI";
                break;
        }
        //cambiar el array
        let newArray = filteredSubject.filter((sem)=> sem.semestre == tu)
        getShowSig(newArray)       
        let codesArr = []
        for (let i =0; i< store.user.materia.length; i++ ){
            if (store.user.materia[i].notas>= 10)
                codesArr.push(store.user.materia[i].codigo)
        }
        console.log(codesArr)
        getCodeArr(codesArr)
        getView(false)

    }

    const funcPrela=(prelaciones, semestre)=>{
        let prela=[]
        prela = prelaciones.split(" ");
        if (prela[0]==0){
            return true
        } 
        else{
            let cont =0;
            for (let i =0; i< codeArr.length; i++){
                for (let j=0; j<prela.length;j++)
                    if (codeArr[i]== prela[j])
                        cont = cont +1
            }
            if (cont == 0 || cont != prela.length)
                return false
            else
                return true

        }
    }

    const updateEnroll =(cod)=>{
        let flag = true
        for (let i =0; i< theArray.length; i++){
            if (theArray[i].codigo == cod)
                flag = false
        }
        if (flag){
            for (let i =0; i< showSig.length; i++){
                let codi = showSig[i].codigo
                if (codi == cod){                                
                    setTheArray(theArray => [...theArray, showSig[i]])    
                }
                }
        }        
    }

    const removeEnroll =(index)=>{
        let indexdelete=index       
        setTheArray( theArray.filter((item,index)=>{
            if (index != indexdelete){
                return item
            }
        }))        
    }

    const funcCheck=(codigo)=>{
        for (let i =0; i< theArray.length; i++){
            if (theArray[i].codigo == codigo)
                return true
        }
        return false
    }

    const uploadSig= async()=>{
        let arr = theArray
        arr.unshift({"UserID":store.user.id})
        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/upload_subject",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"                
                } ,
                body : JSON.stringify(theArray)
                    
                   
            });
            if (response.status ==201){
                alert("se cargaron las materias con exito")
                setTheArray([])

            } else{
                throw new Error(response.status)
            }
            
        } catch (error) {
            console.log(error)
        }
    }



    return(
        <div className="container">
            <h2>inscribir materia</h2>
            <div className="">
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e)=>showList(e.target.value)}>
                    <option defaultValue={"Semestre"} >Semestre</option>
                    <option value="Semestre I" >Semestre I</option>
                    <option value="Semestre II">Semestre II</option>
                    <option value="Semestre III">Semestre III</option>
                    <option value="Semestre IV">Semestre IV</option>
                    <option value="Semestre V">Semestre V</option>
                    <option value="Semestre VI">Semestre VI</option>                
                </select>
                <div className="d-flex justify-content-between">
                    <ul className="list-group list-group-flush ">
                        {!showSig ? (<li className="list-group-item">Loading...</li>)
                        :(
                            showSig.map((sig,index)=>
                            <li htmlFor="check" className="list-group-item" value={sig.semestre} key={sig.codigo}  >
                                <input name="check" disabled={funcPrela(sig.prelaciones,sig.semestre) ?(false):(true)} 
                                checked={funcCheck(sig.codigo)?(true):(false)}
                                className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" 
                                onChange={(e)=>updateEnroll(sig.codigo)}/>
                                {sig.codigo} {sig.materias}
                            </li>                            
                        ))}                        
                    </ul>
                    {!showSig ? (<div >uno</div>):
                        (<div className=" ms-3 form-control border w-50" id="exampleFormControlTextarea1" 
                            style={{display: showSig.length ==0 ? 'none' : 'block' }}>
                            <ul className="list-group list_bullet" >                
                            {!showSig ? (<div display={"none"}>uno</div>)
                            :(
                                theArray.map((sig,index)=>                            
                                <li htmlFor="check" className="d-flex justify-content-between" key={index} id={index} >
                                    <span>{sig.codigo}-{sig.materias}</span>                            
                                    <span className="ms-5 delete_list" id={index} onClick={(e)=>removeEnroll(e.target.id)}><i  id={index}  className="text-danger fa-regular fa-trash-can"></i></span>
                                </li>                                                      
                            ))}   
                        </ul>
                        </div> 
                    )}
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-success btn-md " style={{display: showSig.length == 0 ? 'none' : 'block' }} onClick={(e)=>uploadSig()}>
                        INSCRIBIRSE
                    </button>
                </div>
            </div>

        </div>
    )


}