import React, { useCallback, useEffect, useState } from "react";
import analyticsStyle from "./Analytics.module.css";
import Quizes from "./Quizes";
import { API } from "../../Services/Api";
import axios from "axios";

const Analytic = ({ popup }) => {
  const [allQuiz, setAllQuiz] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/view-quiz`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setAllQuiz(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
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
          {allQuiz.map((quiz, index) => (
            <Quizes
              key={index}
              quiz={quiz}
              index={index}
              fetchDataAndUpdate={fetchData}
              popup={popup}
            />
          ))}
        </div>
      </div>
      <div className={analyticsStyle.footer}>
        <h4>
         &#123;More quiz can be added &#125;
        </h4>
      </div>
    </>
  );
};

export default Analytic;
