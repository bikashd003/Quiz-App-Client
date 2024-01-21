import { createContext, useState, useRef } from "react";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [quizType, setQuizType] = useState("");
  const [timer, setTimer] = useState(0);
  const [optionType, setOptionType] = useState("text");
  const [linkModal, setLinkModal] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      options: ["", "", ""],
      correctOption: "",
    },
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: "",
      options: [
        { text: "", imageURL: "" },
        { text: "", imageURL: "" },
        { text: "", imageURL: "" },
      ],
      correctOption: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== id);
    setQuestions(updatedQuestions);
  };

  return (
    <QuizContext.Provider
      value={{
        linkModal,
        setLinkModal,
        timer,
        setTimer,
        optionType,
        setOptionType,
        title,
        setTitle,
        quizType,
        setQuizType,
        questions,
        addQuestion,
        removeQuestion,
        setQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
export { QuizContext, QuizProvider };
