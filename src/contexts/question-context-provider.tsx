"use client";

import { Question } from "@/lib/types";
import React, { createContext, useState } from "react";

type QuestionContextProviderProps = {
  children: React.ReactNode;
  data: Question[];
};

type TQuestionContext = {
  questions: Question[];
  selectedQuestionId: string | null;
  selectedQuestion: Question | undefined;
  numberOfQuestions: number;
  answerFirstLetter: string | undefined;
  answerNumOfLetters: number | undefined;
  handleChangeSelectedQuestion: (id: string) => void;
};

export const QuestionContext = createContext<TQuestionContext | null>(null);

export default function QuestionContextProvider({
  children,
  data: questions,
}: QuestionContextProviderProps) {
  // state
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );

  // derived state
  const selectedQuestion = questions.find(
    (question) => question.id === selectedQuestionId
  );
  const numberOfQuestions = questions.length;
  const answerFirstLetter =
    selectedQuestion &&
    selectedQuestion.answer[0] == "ا" &&
    selectedQuestion.answer[1] == "ل"
      ? selectedQuestion.answer[2]
      : selectedQuestion?.answer[0];
  const answerNumOfLetters = selectedQuestion?.answer.length;

  // event handlers / actions
  const handleChangeSelectedQuestion = (id: string) => {
    setSelectedQuestionId(id);
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        selectedQuestionId,
        selectedQuestion,
        numberOfQuestions,
        answerFirstLetter,
        answerNumOfLetters,
        handleChangeSelectedQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
