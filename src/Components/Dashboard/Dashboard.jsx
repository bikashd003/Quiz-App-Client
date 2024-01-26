import React, { useContext, useEffect, useState } from "react";
import dashboardStyle from "./Dashboard.module.css";
import Navbar from "./Navbar";
import QuizDetails from "./QuizDetails";
import TrendingQuiz from "./TrendingQuiz";
import Analytics from "../Analytics/Analytic";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../CreateQuiz/QuizContext";
import QuizAnalysis from "../QuestionAnalysis/QuizAnalysis";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const { dasboardState, createModal, setCreateModal } =
    useContext(QuizContext);
  const navigate = useNavigate();
  const closeModal = () => {
    setCreateModal(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className={dashboardStyle.dashboard_container}>
        <div className={dashboardStyle.navbar}>
          <Navbar popup={setCreateModal} />
        </div>
        {createModal && <CreateQuiz closeModal={closeModal} />}
        {dasboardState === "dashboard" ? (
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
              </div>
            </div>
          </div>
        ) : dasboardState === "analytics" ? (
          <div className={dashboardStyle.Analytics_container}>
            <Analytics />
          </div>
        ) : dasboardState === "quizAnalysis" ? (
          <div className={dashboardStyle.Analytics_container}>
            <QuizAnalysis />
          </div>
        ) : (
          ""
        )}
        <ToastContainer
        />
      </div>
    </>
  );
};

export default Dashboard;
