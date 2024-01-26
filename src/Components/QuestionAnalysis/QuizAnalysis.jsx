import React, { useContext, useEffect, useState } from "react";
import quizAnalysis from "./QuizAnalysis.module.css";
import { QuizContext } from "../CreateQuiz/QuizContext";
import { API } from "../../Services/Api";
import axios from "axios";
import moment from "moment";

const QuizAnalysis = () => {
  const { analysisQuizId } = useContext(QuizContext);
  const [questions, setQuestions] = useState([]);
  const [impression, setImpression] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    axios
      .post(
        `${API}/view-quiz-analysis`,
        { quizId: analysisQuizId },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setQuestions(res.data.polls || res.data.questions);
        setImpression(res.data.impression);
        setFormattedDate(moment(res.data.createdAt).format("DD MMM, YYYY"));
        setTitle(res.data.quizTitle);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {questions.length > 0 && (
        <div className={quizAnalysis.analysis_container}>
          <div className={quizAnalysis.heading}>
            <h1>{title} Question Analysis</h1>
            <div className={quizAnalysis.impression}>
              <h2>Created on: {formattedDate}</h2>
              <h2>Impression: {impression}</h2>
            </div>
          </div>
          {questions.map((question, index) => (
            <div className={quizAnalysis.analysis_quiz} key={index}>
              <h1>
                Q.{index + 1} {question.text}
              </h1>
              <div className={quizAnalysis.options}>
                <h2>
                  {question.userAttempt} <br />
                  <span>people Attempted the question</span>
                </h2>
                <h2>
                  {question.correctedAttempt} <br />
                  <span>people Answered Correctly</span>
                </h2>
                <h2>
                  {question.inCorrectedAttempt} <br />
                  <span>people Answered Incorrectly</span>
                </h2>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default QuizAnalysis;
