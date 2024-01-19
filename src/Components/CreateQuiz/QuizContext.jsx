import { createContext, useState,useRef } from "react";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const title = useRef("");
  const [quizType, setQuizType] = useState(""); 

  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      options: ["", "", ""],
      timer: "off",
      type: "text",
      correctOption: ""
    },
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: "",
      options: ["", "", ""],
      timer: "off",
      type: "text",
      correctOption: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    const updatedQuestions = questions.filter((_,idx) => idx !== id);
    setQuestions(updatedQuestions);
  };

  return (
    <QuizContext.Provider value={{title,quizType,setQuizType, questions, addQuestion, removeQuestion,setQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};
export { QuizContext, QuizProvider };
