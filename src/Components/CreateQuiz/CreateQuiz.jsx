import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "./QuizContext";
import createQuiz from "./CreateQuiz.module.css";
import CreateQuestion from "./CreateQuestion";

const CreateQuiz = ({ closeModal }) => {
  const [error, setError] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);
  const { title, setTitle, quizType, setQuizType, resetState } =
    useContext(QuizContext);

  const handleQuizType = (type) => {
    setQuizType(type);
  };

  const handleContinue = () => {
    if (!title || !quizType) {
      setError(true);
    } else {
      setError(false);
      setQuestionModal(true);
    }
  };
  const handleCancel = () => {
    closeModal();
    resetState();
  };
  return (
    <>
      <div className={createQuiz.modal_wraper} onClick={closeModal}></div>
      <div className={createQuiz.create_container}>
        <input
          type="text"
          placeholder="Quiz name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
        />
        <div className={createQuiz.quiz_type}>
          <h1>Quiz Type</h1>
          <h3
            onClick={() => handleQuizType("Q&A")}
            className={quizType === "Q&A" ? createQuiz.active_type : ""}
          >
            Q & A
          </h3>
          <h3
            onClick={() => handleQuizType("Poll Type")}
            className={quizType === "Poll Type" ? createQuiz.active_type : ""}
          >
            Poll Type
          </h3>
        </div>
        <div className={createQuiz.create_quiz_btns}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleContinue}>Continue</button>
        </div>
        {error && <p>Invalid Credentials</p>}
      </div>
      {questionModal && <CreateQuestion closeModal={closeModal} />}
    </>
  );
};

export default CreateQuiz;
