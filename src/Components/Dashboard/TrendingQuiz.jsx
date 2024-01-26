import React, { useState } from "react";
import dashboardStyle from "./Dashboard.module.css";
import eye from "../../assets/eyes.svg";
import moment from "moment";

const TrendingQuiz = ({ quiz }) => {
  return (
    <>
      <div className={dashboardStyle.trends_quizs}>
        <div className={dashboardStyle.quiz_title}>
          <h1>{quiz.quizTitle}</h1>
          <div className={dashboardStyle.quiz_impressions}>
            <p>{quiz.impression}</p>
            <img src={eye} alt={dashboardStyle.impression} />
          </div>
        </div>
        <div className={dashboardStyle.created_on}>
          <p>{moment(quiz.createdAt).format("DD MMM, YYYY")}</p>
        </div>
      </div>
    </>
  );
};

export default TrendingQuiz;
