export type Question = {
  id: string;
  question: string;
  answer: string;
  answerFirstLetter: string;
  category: string;
  difficulty: string;
  answered: boolean;
  hint: string | null;
};
