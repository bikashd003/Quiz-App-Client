import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Dashboard from "./Components/Dashboard/Dashboard";
import { QuizProvider } from "./Components/CreateQuiz/QuizContext";
import TakeQuiz from "./Components/TakeQuiz/TakeQuiz";
import axios from "axios";
import { API } from "./Services/Api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignup />,
  },
  {
    path: "/dashboard",
    element: (
      <QuizProvider>
        <Dashboard />
      </QuizProvider>
    ),
  },
  {
    path: "/quiz/:quizId",
    loader: async ({ params }) => {
    return  await axios.get(`${API}/quiz-impression/${params.quizId}`);
    },
    element: <TakeQuiz />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
