import React, { useState, useContext } from "react";
import { QuizContext } from "./QuizContext";
import createQuiz from "./CreateQuiz.module.css";
import Question from "./Question";

const CreateQuestion = ({ closeModal }) => {
  const { questions, addQuestion, removeQuestion, setQuestions } =
  useContext(QuizContext);
  console.log(questions)
  const [startQuestionIndex, setStartQuestionIndex] = useState(1);

  const handleQuestionType = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    setQuestions(updatedQuestions);
  };
  const handleQuestionText = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
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
    }
  };

  const handleRemoveQuestion = (index) => {
    console.log(questions[index-1].id)
    removeQuestion(questions[index-1].id);
    // console.log(questions)
  
  };
  
  const handleTimerChange = (questionIndex, timerValue) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].timer = timerValue;
    setQuestions(updatedQuestions);
  };
  
  const handleAddQuestionToQuiz = () => {
    questions.forEach((question) => {
      if (question.text && question.options.some((option) => option !== "")) {
        setQuestions(question);
      }
    });
    closeModal();
  };

  return (
    <>
      <div className={createQuiz.modal_wraper}></div>

      <div className={createQuiz.question_container}>
        <div className={createQuiz.question_numbers_wraper}>
          <div className={createQuiz.switch_question}>
            {questions.map((_, index) => (
              <div key={index} className={createQuiz.question_numbers}>
                <span className={createQuiz.question_number}>
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
            {questions.length <= 5 && (
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
        {questions.map((question, index) => (
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
        ))}
        <div className={createQuiz.create_quiz_btns}>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleAddQuestionToQuiz}>Continue</button>
        </div>
      </div>
    </>
  );
};

export default CreateQuestion;


