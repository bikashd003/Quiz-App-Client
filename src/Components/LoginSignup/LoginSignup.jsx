import React,{useState} from 'react'
import Signup from './Signup'
import loginsignup from "./LoginSignup.module.css"
import Login from './Login'

const LoginSignup = () => {
    const[state,setState]=useState("signup")
    const handleSignup=()=>{
        setState("signup");

    }
    const handleLogin=()=>{
        setState("login");
    }
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
    </main>
    </>
  )
}

export default LoginSignup