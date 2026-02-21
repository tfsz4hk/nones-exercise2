import React, { createContext, useState } from "react";
import { questions } from "../questions";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizQuestions, setQuizQuestions] = useState(questions);
  const [timer, setTimer] = useState(60); 

  return (
    <QuizContext.Provider
      value={{ quizQuestions, setQuizQuestions, timer, setTimer }}
    >
      {children}
    </QuizContext.Provider>
  );
};