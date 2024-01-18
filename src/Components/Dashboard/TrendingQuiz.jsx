import React from "react";
import dashboardStyle from "./Dashboard.module.css";
import eye from "../../assets/eyes.svg";

const TrendingQuiz = () => {
  return (
    <>
      <div className={dashboardStyle.trends_quizs}>
        <div className={dashboardStyle.quiz_title}>
          <h1>Quiz 1</h1>
          <div className={dashboardStyle.quiz_impressions}>
            <p>666</p>
          <img src={eye} alt={dashboardStyle.impression} /></div>
        </div>
        <div className={dashboardStyle.created_on}>
          <p>Created on:04 sep, 2023</p>
        </div>
      </div>
    </>
  );
};

export default TrendingQuiz;


