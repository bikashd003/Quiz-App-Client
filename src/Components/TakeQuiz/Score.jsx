import React from "react";
import takeQuiz from "./TakeQuiz.module.css";
import trophy from "../../assets/trophy.png";

const Score = ({ score, questionLength, quizType }) => {
  return (
    <>
      {quizType == "Q&A" ? (
        <div className={takeQuiz.trophy_window}>
          <h1>Congrats Quiz is completed</h1>
          <img src={trophy} alt="trophy" />
          <h1>
            Your Score is <span>{score}/{questionLength} </span>
          </h1>
        </div>
      ) : (
        <div className={takeQuiz.trophy_window}>
          <h1>Thank you for participating in the Poll</h1>
        </div>
      )}
    </>
  );
};

export default Score;
