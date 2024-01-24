import React from "react";
import analyticsStyle from "./Analytics.module.css";

const DeleteQuiz = () => {
  return (
    <>
      <div className={analyticsStyle.modal_wraper}></div>
      <div className={analyticsStyle.delete_container}>
        <h1>Are you confirm you want to delete ?</h1>
        <div className={analyticsStyle.delete_btn}>
          <button>Confirm Delete</button>
          <button>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default DeleteQuiz;
