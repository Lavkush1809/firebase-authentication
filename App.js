import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import {auth} from "./firebase";

import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Signup from "./component/signup/Signup";
import './App.css';

function App() {
  const[userName,setUserName]=useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserName(user.displayName)
      }else  setUserName("")
    }) 
  },[])
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Home name={userName}/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
