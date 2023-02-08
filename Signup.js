import React, { useState } from 'react'
import{Link, useNavigate} from "react-router-dom"
import styles from "./Signup.module.css"
import InputControl from '../InputControl/InputControl'
import{createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../../firebase"
export default function Signup() {
    const navigate=useNavigate();
    const [values,setValues]=useState({
        name:"",
        email:"",
        pass:"",
    })
    const [errorMsg,setErrorMsg]=useState("")
    const[submitButtonDisabled,setSubmitButtonDisabled]=useState(false);
    const handleSubmission=()=>{
        if(!values.name || !values.email|| !values.pass ){
            setErrorMsg("Fill all fields")
            return;
        }
        setErrorMsg("");
        setSubmitButtonDisabled(true);

        createUserWithEmailAndPassword(auth,values.email,values.pass).then(async(res)=>{
            setSubmitButtonDisabled(false)
            const user= res.user;
           await updateProfile(user,{
                displayName:values.name,
            })
            navigate("/")
            console.log(user);
        })
        .catch((err)=>{
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message)
        })
    }
  return (
    <div className={styles.container}>

        <div className={styles.innerbox}>
         <h1 className={styles.heading}>Signup</h1>

         <InputControl label ="Name" placeholder="Enter Name" onChange={(e)=>setValues((prev)=>({...prev, name: e.target.value}))}/><br/>
         <InputControl label ="Email" placeholder="Enter email id" onChange={(e)=>setValues((prev)=>({...prev, email: e.target.value}))}/><br/>
         <InputControl label ="Password" placeholder="Enter password" onChange={(e)=>setValues((prev)=>({...prev, pass: e.target.value}))}/><br/>
         <div className={styles.footer}>
            <p className={styles.error}>{errorMsg}</p>
            <button onClick={handleSubmission} disabled={submitButtonDisabled}>Signup</button>
            <p>
                Already have an account?
                <span>
                    <Link to="/Login">Login</Link>
                </span>
            </p>
         </div>
        </div>

    </div>
  )
}
