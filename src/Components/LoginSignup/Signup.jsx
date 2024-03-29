import React, { useState } from "react";
import Input from "./Input";
import loginsignup from "./LoginSignup.module.css";
import axios from "axios";
import { API } from "../../Services/Api.js";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

const Signup = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [weekPasswordError, setWeekPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError(true);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setPasswordError(false);
      setError(false);
      setWeekPasswordError(true);
      setPassword("");
      setConfirmPassword("");
      return;
    }

    setWeekPasswordError(false);
    setPasswordError(false);
    setLoading(true);

    try {
      const response = await axios.post(`${API}/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
      if (response.status === 201) {
        state("login");
      }
    } catch (error) {
      if (error.response.data.error === "Email already exist") {
        toast("Admin already exists");
      } else {
        toast("Error submitting data:");
      }
    } finally {
      setLoading(false);
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
        {loading ? (
          <PuffLoader color="#ffff" height={5} radius={2} width={4} size={40} />
        ) : (
          "Sign-Up"
        )}
      </button>
    </form>
  );
};

export default Signup;
