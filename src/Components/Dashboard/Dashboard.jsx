import React from "react";
import dashboardStyle from "./Dashboard.module.css";
import Navbar from "./Navbar";
import QuizDetails from "./QuizDetails";
import TrendingQuiz from "./TrendingQuiz";
const Dashboard = () => {
  return (
    <>
      <div className={dashboardStyle.dashboard_container}>
        <div className={dashboardStyle.navbar}>
          <Navbar />
        </div>
        <div className={dashboardStyle.dashboard_content}>
         <div className={dashboardStyle.trending_quiz_wraper}>
          <div className={dashboardStyle.quiz_Details}>
            <QuizDetails className="quiz" />
            <QuizDetails className="question" />
            <QuizDetails className="impressions" />
          </div>
         <h1>Trending Quizs</h1>
          <div className={dashboardStyle.trending_quizs}>
           <TrendingQuiz />
           <TrendingQuiz />
           <TrendingQuiz />
           <TrendingQuiz />
           <TrendingQuiz />
          </div>
         </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
