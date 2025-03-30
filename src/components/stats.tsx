"use client";

import { useQuestionContext } from "@/lib/hooks";

export default function Stats() {
  const { numberOfQuestions } = useQuestionContext();

  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{numberOfQuestions}</p>
      <p className="opacity-80">سؤال</p>
    </section>
  );
}
