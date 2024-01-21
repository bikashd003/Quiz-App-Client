import React, { useEffect, useState } from "react";
import takeQuiz from "./TakeQuiz.module.css";
import { API } from "../../Services/Api";
import axios from "axios";
const TakeQuiz = () => {
  const[question,setQuestion]=useState([]);
  useEffect(() => {
    axios
      .get(`${API}/take-quiz`)
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <div className={takeQuiz.take_quiz_container}>
        <div className={takeQuiz.questions_window}>
          <div className={takeQuiz.number_timer}>
            <h1>01/04</h1>
            <h1>00.10s</h1>
          </div>
          <div className={takeQuiz.question_options}>
            <h1>Your question text comes here, its a sample text.</h1>
            <div>
              <h2>Option1</h2>
              <h2>Option2</h2>
              <h2>Option3</h2>
              <h2>Option4</h2>
            </div>
          </div>
          <div className={takeQuiz.submit_button}>
            <button>NEXT</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TakeQuiz;
