import AddQuestionForm from "@/components/add-question-form";
import Container from "@/components/container";
import H1 from "@/components/h1";
import React from "react";

export default function Page() {
  return (
    <main>
      <div className=" text-white py-8 text-right">
        <H1>
          أضف <span className="font-semibold">سؤال</span>
        </H1>
      </div>
      <div className="flex justify-center items-center">
        <Container>
          <AddQuestionForm />
        </Container>
      </div>
    </main>
  );
}
