import React, { useRef, useState } from "react";
import Input from "./Input";
import loginsignup from "./LoginSignup.module.css";
import axios from "axios";
import { API } from "../../Services/Api.js"

const Signup = ({state}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);


  const handleSignUp = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
    if (!name || !email || !password || !confirmPassword) {
      setError(true);
    }
   await axios.post(`${API}/register`,{name,email,password,confirmPassword})
   .then((res)=>{
    state("login")

    })
    .catch((err)=>{
      alert(err.response.data.message)
    
      console.log(err)
    })
  };
  return (
    <form onSubmit={handleSignUp} className={loginsignup.login_form}>
      <Input
      error={error}
        type="text"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
      error={error}
        type="text"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
      error={error}
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
      error={error}
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit" className={loginsignup.submit_btn}>
        Sign-Up
      </button>
    </form>
  );
};
export default Signup;
