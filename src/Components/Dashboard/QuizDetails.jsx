import React, {useState, useEffect,useCallback } from "react";
import dashboardStyle from "./Dashboard.module.css";
import TrendingQuiz from "./TrendingQuiz";
import axios from "axios";
import {API} from "../../Services/Api"

const QuizDetails = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const[trendingQuiz,setTrendingQuiz]=useState([])

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/all-quiz`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setAllQuiz(response.data.allDetails);
      setTrendingQuiz(response.data.trendingQuiz);
      setNumberOfQuestions(response.data.numberOfQuestions);
      setTotalImpressions(response.data.totalImpressions);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  return (
    <>
      <div className={dashboardStyle.trending_quiz_wraper}>
        <div className={dashboardStyle.quiz_Details}>
          <div
            className={`${dashboardStyle.quiz_view} & ${dashboardStyle.quiz}`}
          >
            <h1>{allQuiz.length}</h1>
            <p>Quiz</p>
            <h2>Created</h2>
          </div>
          <div
            className={`${dashboardStyle.quiz_view} & ${dashboardStyle.question}`}
          >
            <h1>{numberOfQuestions}</h1>
            <p>questions</p>
            <h2>Created</h2>
          </div>
          <div
            className={`${dashboardStyle.quiz_view} & ${dashboardStyle.impressions}`}
          >
            <h1>{totalImpressions}</h1>
            <p>Total</p>
            <h2>impression</h2>
          </div>
        </div>
        <h1>Trending Quizs</h1>
        <div className={dashboardStyle.trending_quizs}>
        {trendingQuiz.map((quiz,index)=>(
          <TrendingQuiz key={index} quiz={quiz}/>))}
        </div>
      </div>
    </>
  );
};

export default QuizDetails;
