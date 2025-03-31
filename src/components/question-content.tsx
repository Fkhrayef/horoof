"use client";

import { useQuestionContext } from "@/lib/hooks";

export default function QuestionContent() {
  const { selectedQuestion, answerNumOfLetters } = useQuestionContext();
  const hint = selectedQuestion?.hint
    ? selectedQuestion.hint
    : `عدد الاحرف: ${answerNumOfLetters}`;
  return (
    <section className="mt-1">
      {!selectedQuestion ? (
        <EmptyView />
      ) : (
        <>
          <div className="text-center space-y-4 border border-accent p-4 rounded-lg w-full">
            <div className="space-y-1">
              <p className="text-sm">:السؤال</p>
              <p className="font-black text-md">{selectedQuestion?.question}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">:الإجابة</p>
              <p className="font-black text-md">{selectedQuestion?.answer}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">:تلميح</p>
              <p className="font-black text-md">{hint}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function EmptyView() {
  return (
    <p className="h-full flex justify-center items-center text-2xl font-medium">
      حدد سؤالاً
    </p>
  );
}
