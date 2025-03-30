import { QuestionContext } from "@/contexts/question-context-provider";
import { useContext } from "react";

export function useQuestionContext() {
  const context = useContext(QuestionContext);

  if (!context) {
    throw new Error(
      "useQuestionContext must be used within a QuestionContextProvider"
    );
  }
  return context;
}
