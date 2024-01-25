import React, { useState, useContext } from "react";
import { QuizContext } from "./QuizContext";
import createQuiz from "./CreateQuiz.module.css";
import Question from "./Question";
import axios from "axios";
import { API } from "../../Services/Api";
import LinkModal from "./LinkModal";

const CreateQuestion = ({ closeModal }) => {
  const {
    timer,
    title,
    setTitle,
    quizType,
    setQuizType,
    setTimer,
    setOptionType,
    questions,
    addQuestion,
    removeQuestion,
    setQuestions,
    linkModal,
    setLinkModal,
  } = useContext(QuizContext);
  const [startQuestionIndex, setStartQuestionIndex] = useState(1);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(1);
  const [error, setError] = useState(false);
  const [quizId, setQuizId] = useState("");

  const handleQuestionType = (type) => {
    setOptionType(type);
  };
  const handleQuestionText = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, type, value) => {
    const updatedQuestions = [...questions];
    if (type === "text") {
      updatedQuestions[questionIndex].options[optionIndex] = {
        ...updatedQuestions[questionIndex].options[optionIndex],
        text: value,
      };
    } else if (type === "imageURL") {
      updatedQuestions[questionIndex].options[optionIndex] = {
        ...updatedQuestions[questionIndex].options[optionIndex],
        imageURL: value,
      };
    }
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };
  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      addQuestion();
      setSelectedQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRemoveQuestion = (index) => {
    removeQuestion(questions[index - 1].id);
    console.log(selectedQuestionIndex);
    setSelectedQuestionIndex((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleTimerChange = (timerValue) => {
    setTimer(timerValue);
  };
  const handleQuestion = (index) => {
    setSelectedQuestionIndex(index);
  };
  const handleAddQuestionToQuiz = () => {
    const token = localStorage.getItem("token");

    questions.map((question) => {
      if (!question.text) {
        setError(true);
      } else if (quizType === "Q&A") {
        if (!question.correctOption) {
          setError(true);
        }
      } else {
        setError(false);
      }
    });

    if (!error) {
      if (quizType === "Q&A") {
        axios
          .post(
            `${API}/create-quiz`,
            {
              quizTitle: title,
              quizType: quizType,
              questions: questions.map((question) => ({
                text: question.text,
                correctOption: question.correctOption,
                timer: timer,
                options: question.options.map((option) => ({
                  text: option.text,
                  imageURL: option.imageURL,
                })),
              })),
            },
            { headers: { Authorization: `${token}` } }
          )
          .then((response) => {
            setQuizId(response.data._id);
            setLinkModal(true);
          })
          .catch((error) => {
            console.log(error);
            if (error.message === "unauthorized") {
              alert("Please log in again");
            }
          });
      }

      if (!error && quizType === "Poll Type") {
        axios
          .post(
            `${API}/create-poll`,
            {
              quizTitle: title,
              quizType: quizType,
              polls: questions.map((question) => ({
                text: question.text,
                options: question.options.map((option) => ({
                  text: option.text,
                  imageURL: option.imageURL,
                })),
              })),
            },
            { headers: { Authorization: `${token}` } }
          )
          .then((response) => {
            setQuizId(response.data._id);
            setLinkModal(true);
          })
          .catch((error) => {
            console.log(error);
            if (error.message === "unauthorized") {
              alert("Please log in again");
            }
          });
      }
    }
  };

  return (
    <>
      <div className={createQuiz.modal_wraper} onClick={closeModal}></div>

      {!linkModal && (
        <div className={createQuiz.question_container}>
          <div className={createQuiz.question_numbers_wraper}>
            <div className={createQuiz.switch_question}>
              {questions.map((_, index) => (
                <div key={index} className={createQuiz.question_numbers}>
                  <span
                    className={`${createQuiz.question_number} ${
                      selectedQuestionIndex === index + 1
                        ? createQuiz.selected
                        : ""
                    }`}
                    onClick={() => handleQuestion(index + 1)}
                  >
                    {startQuestionIndex + index}
                  </span>
                  {index > 0 && (
                    <span
                      className={createQuiz.remove_question}
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      ×
                    </span>
                  )}
                </div>
              ))}
              {questions.length < 5 && (
                <button
                  className={createQuiz.add_question_btn}
                  onClick={handleAddQuestion}
                >
                  +
                </button>
              )}
            </div>
            <h1>Max 5 questions</h1>
          </div>
          {questions.map(
            (question, index) =>
              index + startQuestionIndex === selectedQuestionIndex && (
                <Question
                  key={index}
                  question={question}
                  index={index}
                  handleQuestionType={handleQuestionType}
                  handleOptionChange={handleOptionChange}
                  handleQuestionText={handleQuestionText}
                  handleAddOption={handleAddOption}
                  handleRemoveOption={handleRemoveOption}
                  handleCorrectOptionChange={handleCorrectOptionChange}
                  handleTimerChange={handleTimerChange}
                />
              )
          )}
          <div className={createQuiz.create_quiz_btns}>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleAddQuestionToQuiz}>Create Quiz</button>
          </div>
          {error && (
            <h1 className={createQuiz.error_message}>
              Please fill all the fields
            </h1>
          )}
        </div>
      )}
      {linkModal && (
        <LinkModal
          closeModal={closeModal}
          selectedQuestionIndex={setSelectedQuestionIndex}
          quizId={quizId}
        />
      )}
    </>
  );
};

export default CreateQuestion;
