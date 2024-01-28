import React, { useState, useEffect, useCallback } from "react";
import takeQuiz from "./TakeQuiz.module.css";
import { API } from "../../Services/Api";
import { useParams } from "react-router-dom";
import axios from "axios";
import Score from "./Score";
import CountDown from "./CountDown";

const TakeQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { quizId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);
  const [quizType, setQuizType] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/quiz/${quizId}`)
      .then((res) => {
        setQuestions(res.data.polls || res.data.questions);
        setQuizType(res.data.quizType);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [quizId]);

  const submitUserAttempts = async () => {
    if (quizType === "Q&A") {
      try {
        await axios.post(`${API}/saveUserAttempts`, {
          quizId: quizId,
          userAnswers: selectedOptions,
        });
      } catch (error) {
        console.error("Error submitting user attempts:", error);
      }
    } else if (quizType === "Poll Type") {
      try {
        await axios.post(`${API}/saveUserPollAttempts`, {
          quizId: quizId,
          userAnswers: selectedOptions,
        });
      } catch (error) {
        console.error("Error submitting user attempts:", error);
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    if (currentQuestion + 1 === questions.length) {
      setQuizCompleted(true);
      setIsSubmitting(true);
      submitUserAttempts();
    }
  };

  const handleSelectedOption = (optionIndex) => {
    if (!isSubmitting) {
      setSelectedOptions((prev) => {
        const updatedOptions = [...prev];
        updatedOptions[currentQuestion] = optionIndex;
        return updatedOptions;
      });
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.map((question, index) => {
      const correctAnswerIndex = question.correctOption;
      if (selectedOptions[index] !== undefined) {
        const userSelectedIndex = selectedOptions[index];
        if (userSelectedIndex == correctAnswerIndex) {
          score++;
        }
      }
    });
    setScore(score);
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    setIsSubmitting(true);
    calculateScore();
    submitUserAttempts();
  };

  return (
    <>
      {currentQuestion < questions.length && !quizCompleted ? (
        <div className={takeQuiz.take_quiz_container}>
          <div className={takeQuiz.questions_window}>
            <div className={takeQuiz.number_timer}>
              <h1>{`${currentQuestion + 1}/${questions.length}`}</h1>
              {quizType === "Q&A" && questions[currentQuestion]?.timer > 0 ? (
                <CountDown
                  key={currentQuestion}
                  initialTime={questions[currentQuestion]?.timer}
                  onComplete={handleNextQuestion}
                />
              ) : (
                ""
              )}
            </div>
            <div className={takeQuiz.question_options}>
              <h1>{questions[currentQuestion].text}</h1>
              <div>
                {questions[currentQuestion].options.map(
                  (option, optionIndex) => (
                    <section
                      key={optionIndex}
                      onClick={() => {
                        handleSelectedOption(optionIndex);
                      }}
                      className={
                        selectedOptions[currentQuestion] === optionIndex
                          ? takeQuiz.selected
                          : ""
                      }
                    >
                     {option.text &&  <h3>{option.text}</h3> }
                      {option.imageURL && (
                        <img
                          src={option.imageURL}
                          className={takeQuiz.optionImage}
                        />
                      )}
                    </section>
                  )
                )}
              </div>
            </div>
            <div className={takeQuiz.submit_button}>
              {currentQuestion === questions.length - 1 ? (
                <button onClick={handleSubmitQuiz}>SUBMIT</button>
              ) : (
                <button onClick={handleNextQuestion}>NEXT</button>
              )}
            </div>
          </div>
        </div>
      ) : quizCompleted ? (
        <div className={takeQuiz.take_quiz_container}>
          <Score
            quizType={quizType}
            score={score}
            questionLength={questions.length}
          />
        </div>
      ) : (
        <div className={takeQuiz.take_quiz_container}>
          <h1 className={takeQuiz.questions_window}>Loading</h1>
        </div>
      )}
    </>
  );
};

export default TakeQuiz;
