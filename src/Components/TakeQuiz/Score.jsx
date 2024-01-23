import React from "react";
import takeQuiz from "./TakeQuiz.module.css";
import trophy from "../../assets/trophy.png";

const Score = () => {
  return (
    <>
      <div className={takeQuiz.trophy_window}>
        <h1>Congrats Quiz is completed</h1>
        <img src={trophy} alt="trophy" />
        <h1>
          Your Score is <span>03/04</span>
        </h1>
      </div>
    </>
  );
};

export default Score;
