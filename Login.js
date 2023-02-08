import React ,{ useState }from 'react';
import{Link, useNavigate} from "react-router-dom";

import styles from "./Login.module.css"
import InputControl from '../InputControl/InputControl'
import{auth} from "../../firebase"
import { signInWithEmailAndPassword } from 'firebase/auth'


export default function Login() {
    const navigate= useNavigate();
    const[values,setValues]=useState({
        email:"",
        pass:"",
    })
    const [errorMsg,setErrorMsg]=useState("")
    const[submitButtonDisabled,setSubmitButtonDisabled]=useState(false);
    const handleSubmission=()=>{
        if(!values.email || !values.pass){
            setErrorMsg("Fill all fields")
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisabled(true);

        signInWithEmailAndPassword(auth,values.email,values.pass).then(async(res)=>{
            setSubmitButtonDisabled(false)
            navigate("/")
        })
        .catch((err)=>{
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message)
        })
    }
  return (
    <div className={styles.container}>

        <div className={styles.innerbox}>
         <h1 className={styles.heading}>Login</h1>
         <InputControl label ="Email" onChange ={e=>setValues(prev=>({...prev,email:e.target.values}))}placeholder="Enter your mail id"/><br/>
         <InputControl label ="Pssword" onChange ={e=>setValues(prev=>({...prev,email:e.target.values}))} placeholder="Enter your password"/><br/>
         <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button disabled={submitButtonDisabled} onClick={handleSubmission}>Login</button>
            <p>
                Don't have an account?
                <span>
                    <Link to="/signup">Sign up</Link>
                </span>
            </p>
         </div>
        </div>

    </div>
  )
}
