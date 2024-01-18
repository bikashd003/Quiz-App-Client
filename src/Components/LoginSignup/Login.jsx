import React, { useEffect, useState } from "react";
import Input from "./Input";
import loginsignup from "./LoginSignup.module.css";
import axios from "axios";
import { API } from "../../Services/Api.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
    }
    axios
      .post(`${API}/login`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/dashboard")
    }

  },[])
  return (
    <>
      <form onSubmit={handleLogin} className={loginsignup.login_form}>
        <Input
          error={error}
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          error={error}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={loginsignup.submit_btn}>
          Log In
        </button>
      </form>
    </>
  );
};

export default Login;
