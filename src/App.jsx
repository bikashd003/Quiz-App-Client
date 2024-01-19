import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Dashboard from "./Components/Dashboard/Dashboard";
import { QuizProvider } from "./Components/CreateQuiz/QuizContext";
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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
