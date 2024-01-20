import React from "react";
import analyticsStyle from "./Analytics.module.css";
import Quizes from "./Quizes";

const Analytic = () => {
  return (
    <>
      <div className={analyticsStyle.analytics_container}>
        <h1>Quiz Analysis</h1>
        <div className={analyticsStyle.analysis_navaber}>
          <h2>S.No</h2>
          <h2>Quiz name</h2>
          <h2>Created On</h2>
          <h2>Impression</h2>
        </div>
        <div className={analyticsStyle.quiz_details_container}>
          <Quizes />
          <Quizes />
          <Quizes />
          <Quizes />
          <Quizes />
          <Quizes />
          <Quizes />
        </div>
      </div>
    </>
  );
};

export default Analytic;
