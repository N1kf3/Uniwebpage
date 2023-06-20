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
        console.log("materias del usuario",materias)
        let codesArr=[]
        for (let i =0; i< materias.length; i++ ){
            if (materias[i].notas>= 10)
                codesArr.push(materias[i].codigo)
        }
        let newArr = materiasData.filter(item => !codesArr.includes(item.codigo))
        return (newArr)


    }

    const showList=(tu)=>{
        let filteredSignature= control_sig(store.user.materia , store.user_Sig)
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
        console.log("store.user.materia",store.user.materia)
        let newArray = filteredSignature.filter((sem)=> sem.semestre == tu)
        getShowSig(newArray)       
        let codesArr = []
        for (let i =0; i< store.user.materia.length; i++ ){
            if (store.user.materia[i].notas>= 10)
                codesArr.push(store.user.materia[i].codigo)
        }
        getCodeArr(codesArr)
        getView(false)
        console.log("codigos de materias para prealciones",codesArr)

    }

    const funcPrela=(prelaciones, semestre)=>{
        let prela=[]
        prela = prelaciones.split(" ");
        if (semestre == "I"){
            return true
        } 
        else{
            let cont =0;
            for (let i =0; i< codeArr.length; i++){
                for (let j=0; j<prela.length;j++)
                    if (codeArr[i]== prela[j])
                        cont =1
            }
            if (cont == 0)
                return false
            else
                return true

        }
    }
    let enrolledSig=[]
    const updateEnroll =(cod)=>{
        console.log(cod)
        let ar
        for (let i =0; i< showSig.length; i++){
            let codi = showSig[i].codigo
            if (codi == cod){
                console.log("materia seleccionada",showSig[i])
                ar = showSig[i]
            }
            }
        setTheArray(theArray => [...theArray, ar])    
        
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
                <div className="d-flex ">
                    <ul className="list-group list-group-flush w-50">
                        {!showSig ? (<li className="list-group-item">Loading...</li>)
                        :(
                            showSig.map((sig,index)=>
                            <li htmlFor="check" className="list-group-item" value={sig.semestre} key={sig.codigo}  >
                                <input name="check" disabled={funcPrela(sig.prelaciones,sig.semestre) ?(false):(true)} className="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" 
                                onChange={(e)=>updateEnroll(sig.codigo)}/>
                                {sig.codigo} {sig.materias}
                            </li>                            
                        ))}                        
                    </ul>

                        {!showSig ? (<div >uno</div>):
                            (<div className="flex-fill ms-3 form-control border w-75" id="exampleFormControlTextarea1" rows="3" 
                            style={{display: view ? 'none' : 'block' }}>
                                {!showSig ? (<div display={none}>uno</div>)
                                :(
                                    theArray.map(sig=>                            
                                    <div >
                                    {sig.codigo} {sig.materias}
                                    </div>                                                      
                                ))}   
                            </div> )}
             

                </div>
            </div>

        </div>
    )


}