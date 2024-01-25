import React, { useContext } from "react";
import quizAnalysis from "./QuizAnalysis.module.css";
import { QuizContext } from "../CreateQuiz/QuizContext";

const QuizAnalysis = () => {
  const { analysisQuizId } = useContext(QuizContext);
  console.log(analysisQuizId);
  return (
    <>
      <div className={quizAnalysis.analysis_container}>
        <div className={quizAnalysis.heading}>
          <h1>Quiz 1 Question Analysis</h1>
          <div className={quizAnalysis.impression}>
            <h2>Created on: 04 Sep 2023</h2>
            <h2>Impression: 660</h2>
          </div>
        </div>
        <div className={quizAnalysis.analysis_quiz}>
          <h1>Q.1 Question place holder for analysis</h1>
          <div className={quizAnalysis.options}>
            <h2>
              60 <br />
              <span>people Attempted the question</span>
            </h2>
            <h2>
              38 <br />
              <span>people Answered Correctly</span>
            </h2>
            <h2>
              22 <br />
              <span>people Answered Incorrectly</span>{" "}
            </h2>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default QuizAnalysis;
