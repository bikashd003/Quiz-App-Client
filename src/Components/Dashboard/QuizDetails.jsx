import React from "react";
import dashboardStyle from "./Dashboard.module.css";

const QuizDetails = ({ className }) => {
  return (
    <>
      <div
        className={`${dashboardStyle.quiz_view} & ${
          className === "quiz"
            ? dashboardStyle.quiz
            : className === "question"
            ? dashboardStyle.question
            : dashboardStyle.impressions
        }`}
      >
        <h1>12</h1>
        <p>Quiz</p>
        <h2>Created</h2>
      </div>
    </>
  );
};

export default QuizDetails;
