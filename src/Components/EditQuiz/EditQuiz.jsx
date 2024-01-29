import React, { useState, useContext, useEffect } from "react";
import { QuizContext } from "../CreateQuiz/QuizContext";
import createQuiz from "../CreateQuiz/CreateQuiz.module.css";
import Questions from "./Questions";
import axios from "axios";
import { API } from "../../Services/Api";
import LinkModal from "../CreateQuiz/LinkModal";
const EditQuiz = ({ closeModal }) => {
  const {
    timer,
    setTitle,
    title,
    quizType,
    setQuizType,
    setTimer,
    setOptionType,
    optionType,
    questions,
    addQuestion,
    removeQuestion,
    setQuestions,
    linkModal,
    setLinkModal,
    analysisQuizId,
    resetState,
  } = useContext(QuizContext);
  const [startQuestionIndex, setStartQuestionIndex] = useState(1);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(1);
  const [error, setError] = useState(false);
  const [quizId, setQuizId] = useState("");
  useEffect(() => {
    if (analysisQuizId) {
      axios
        .post(
          `${API}/view-quiz-analysis`,
          { quizId: analysisQuizId },
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        )
        .then((res) => {
          setQuizId(res.data._id);
          setQuizType(res.data.quizType);
          setTitle(res.data.quizTitle);
          if (res.data.quizType === "Q&A") {
            setOptionType(res.data.questions[0].optionType);
            setTimer(res.data.questions[0].timer);

            setQuestions(
              res.data.questions.map((question) => ({
                ...question,
                correctOption: question.correctOption,
              }))
            );
          }
          if (res.data.quizType === "Poll Type") {
            setOptionType(res.data.polls[0].optionType);
            setQuestions(res.data.polls);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [analysisQuizId]);

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
    setSelectedQuestionIndex((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handleTimerChange = (timerValue) => {
    setTimer(timerValue);
  };
  const handleQuestion = (index) => {
    setSelectedQuestionIndex(index);
  };
  const handleUpdateQuiz = () => {
    setLinkModal(true);
    console.log(questions);
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
          .put(
            `${API}/update-quiz`,
            {
              quizTitle: title,
              quizType: quizType,
              questions: questions.map((question) => ({
                text: question.text,
                optionType: optionType,
                correctOption: question.correctOption,
                timer: timer,
                options: question.options.map((option) => ({
                  text: option.text,
                  imageURL: option.imageURL,
                })),
              })),
              quizId: quizId,
            },
            {
              headers: { Authorization: `${localStorage.getItem("token")}` },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (quizType === "Poll Type") {
        axios
          .put(
            `${API}/update-poll`,
            {
              quizTitle: title,
              quizType: quizType,
              polls: questions.map((question) => ({
                text: question.text,
                optionType: optionType,
                options: question.options.map((option) => ({
                  text: option.text,
                  imageURL: option.imageURL,
                })),
              })),
              quizId: quizId,
            },
            { headers: { Authorization: `${localStorage.getItem("token")}` } }
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
  const handleCancel = () => {
    resetState();
    closeModal();
  };
  return (
    <>
      <div className={createQuiz.modal_wraper}></div>

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
                <Questions
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
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleUpdateQuiz}>Update Quiz</button>
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

export default EditQuiz;
