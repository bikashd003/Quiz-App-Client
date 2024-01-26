import React, { useContext, useState, useEffect } from "react";
import createQuiz from "./CreateQuiz.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { QuizContext } from "./QuizContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LinkModal = ({ closeModal, selectedQuestionIndex, quizId }) => {
  const {
    setTitle,
    setQuizType,
    setTimer,
    setOptionType,
    setLinkModal,
    setQuestions,
  } = useContext(QuizContext);

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
  const handleCopy = () => {
    const linkInput = document.getElementById("quizLinkInput");

    navigator.clipboard
      .writeText(linkInput.value)
      .then(() => {
        toast("Link copied to Clipboard");
      })
      .catch((error) => {
        console.error("Unable to copy text to clipboard", error);
      });
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
        <input id="quizLinkInput" type="text" value={quizLink} readOnly />
        <button className={createQuiz.share_link} onClick={handleCopy}>
          Share
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default LinkModal;
