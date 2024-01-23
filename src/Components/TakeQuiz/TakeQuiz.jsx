import React, { useEffect, useState } from "react";
import takeQuiz from "./TakeQuiz.module.css";
import { API } from "../../Services/Api";
import { useParams } from "react-router-dom";
import axios from "axios";
import Countdown from "react-countdown";
import Score from "./Score"

const TakeQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { quizId } = useParams();

  useEffect(() => {
    axios
      .get(`${API}/quiz/${quizId}`)
      .then((res) => {
        setQuestions(res.data.polls || res.data.questions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [quizId]);

  const handleNextQuestion = () => {

    setCurrentQuestion((prev) => prev + 1);
    if (currentQuestion + 1 === questions.length) {
      setQuizCompleted(true);
    }
  };


  return (
    <>
      {currentQuestion < questions.length ? (
        <div className={takeQuiz.take_quiz_container}>
          <div className={takeQuiz.questions_window}>
            <div className={takeQuiz.number_timer}>
              <h1>{`${currentQuestion + 1}/${questions.length}`}</h1>
              <Countdown
              key={currentQuestion}
                date={Date.now() + questions[currentQuestion]?.timer * 1000}
                onComplete={handleNextQuestion}
                renderer={({ formatted: { minutes, seconds }, completed }) => (
                  <h1>{`${minutes}:${seconds}s`}</h1>
                )}
              />
            </div>
            <div className={takeQuiz.question_options}>
              <h1>{questions[currentQuestion].text}</h1>
              <div>
                {questions[currentQuestion].options.map(
                  (option, optionIndex) => (
                    <h2 key={optionIndex}>{option.text}</h2>
                  )
                )}
              </div>
            </div>
            <div className={takeQuiz.submit_button}>
              {currentQuestion === questions.length - 1 ? (
                <button>SUBMIT</button>
              ) : (
                <button onClick={handleNextQuestion}>NEXT</button>
              )}
            </div>
          </div>
        </div>
      ) : quizCompleted ?( <div className={takeQuiz.take_quiz_container}>
        <Score />
      </div>):
      (
        <div className={takeQuiz.take_quiz_container}>
          <h1 className={takeQuiz.questions_window}>Loading</h1>
        </div>
      )}
    </>
  );
};

export default TakeQuiz;
