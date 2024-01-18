import React from "react";
import loginsignup from "./LoginSignup.module.css";

const Input = ({error, type, label, value, onChange }) => {
  return (
    <div className={loginsignup.input_item}>
      <label className={loginsignup.label}>{label}</label>
      <input
        placeholder={`${error ? `Invalid ${label}` : ""}`}
        className={`${loginsignup.input} & ${error? loginsignup.error: ""}`}
        type={type}
        value={value}
        onChange={onChange}

      />
    </div>
  );
};

export default Input;
