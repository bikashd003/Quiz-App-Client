import React, { useRef, useState } from "react";
import Input from "./Input";
import loginsignup from "./LoginSignup.module.css";
import axios from "axios";
import { API } from "../../Services/Api.js";

const Signup = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [weekPasswordError, setWeekPasswordError] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
   
    if (password !== confirmPassword) {
      setPasswordError(true);
      setPassword("")
      setConfirmPassword("")
    }

    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setError(false)
      setWeekPasswordError(true);
      setPassword("")
      setConfirmPassword("")
      return;
    }
    if (!name || !email || !password || !confirmPassword) {
      setError(true);
    }
   
    if (!error && !passwordError) {
      try {
        await axios
          .post(`${API}/register`, {
            name,
            email,
            password,
            confirmPassword,
          })
          .then((res) => {

            state("login");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.error(err);
      }
    }
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
        errorPassword={passwordError}
        errorWeekPassword={weekPasswordError}
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        error={error}
        errorPassword={passwordError}
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
