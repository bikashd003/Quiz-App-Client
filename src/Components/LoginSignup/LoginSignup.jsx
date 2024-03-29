import React,{useEffect, useState} from 'react'
import Signup from './Signup'
import loginsignup from "./LoginSignup.module.css"
import Login from './Login'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginSignup = () => {
    const[state,setState]=useState("signup")
    const handleSignup=()=>{
        setState("signup");

    }
    const handleLogin=()=>{
        setState("login");
    }
    const navigate=useNavigate();
    useEffect(()=>{
      const token=localStorage.getItem("token");
      if(token){
        navigate("/dashboard");
      }
    })
  return (
    <>
    <main>

    <div className={loginsignup.container}>
        <h1 className={loginsignup.heading}>QUIZZIE</h1>
        <div className={loginsignup.btns}>
        <button
              className={`${loginsignup.btn} ${state === 'signup' ? loginsignup.activeBtn : ''}`}
              onClick={handleSignup}
            >
              Signup
            </button>
            <button
              className={`${loginsignup.btn} ${state === 'login' ? loginsignup.activeBtn : ''}`}
              onClick={handleLogin}
            >
              Login
            </button>
        </div>
        {state==="signup"?<Signup state={setState}/>:<Login/>}
    </div>
    <ToastContainer />
    </main>
    </>
  )
}

export default LoginSignup