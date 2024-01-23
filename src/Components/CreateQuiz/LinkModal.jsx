import React, { useContext, useState, useEffect } from "react";
import createQuiz from "./CreateQuiz.module.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { QuizContext } from "./QuizContext";

const LinkModal = ({ closeModal, selectedQuestionIndex, quizId }) => {
  const { setTitle, setQuizType, setTimer, setOptionType,setLinkModal, setQuestions } =
    useContext(QuizContext);

  const [quizLink, setQuizLink] = useState("");

  useEffect(() => {
    if (quizId) {
      const link = `http://localhost:5173/quiz/${quizId}`;
      setQuizLink(link);
    }
  }, [quizId]);

  const handleReset = () => {
    setQuestions([
      {
        id: 1,
        text: "",
        options: [
          { text: "", imageURL: "" },
          { text: "", imageURL: "" },
          { text: "", imageURL: "" },
        ],
        correctOption: "",
      },
    ]);
    setTimer(0);
    setOptionType("text");
    setTitle("");
    selectedQuestionIndex(1);
    setQuizType("");
    setQuizLink("");
    setLinkModal(false);
  };

  return (
    <>
      <div className={createQuiz.modal_wraper}></div>

      <div className={createQuiz.link_modal}>
        <button
          className={createQuiz.close_link}
          onClick={() => {
            closeModal();
            handleReset();
          }}
        >
          <AiOutlineClose />
        </button>
        <h1>Congrats your Quiz is Published!</h1>
        <input type="text" value={quizLink} readOnly />
        <button className={createQuiz.share_link}>Share</button>
      </div>
    </>
  );
};

export default LinkModal;
