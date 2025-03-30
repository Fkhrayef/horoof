"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

type getQuestionProps = {
  letter: string;
  difficulty: string[];
  category: string[];
  answeredBefore: string;
};

export async function getQuestion(values: getQuestionProps) {
  try {
    const { letter, difficulty, category, answeredBefore } = values;

    // Create the where clause
    const where: any = {
      answerFirstLetter: letter,
      difficulty: {
        in: difficulty,
      },
      category: {
        in: category,
      },
    };

    // Add answered condition based on answeredBefore value
    if (answeredBefore === "نعم") {
      where.answered = true;
    } else if (answeredBefore === "لا") {
      where.answered = false;
    }
    // If answeredBefore is "لا يهم", we don't add any condition for answered

    const filteredQuestions = await prisma.question.findMany({
      where,
    });

    if (filteredQuestions.length === 0) {
      return {
        message: "لم يتم العثور على أسئلة تطابق معايير البحث",
      };
    }

    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const randomQuestion = filteredQuestions[randomIndex];

    return { data: randomQuestion };
  } catch (error) {
    return {
      message: "لم يتم العثور على سؤال يطابق بحثك",
    };
  }
}

export async function addQuestion(formData: FormData) {
  try {
    if (
      !formData.get("question") ||
      !formData.get("answer") ||
      !formData.get("letter") ||
      !formData.get("difficulty") ||
      !formData.get("category")
    ) {
      return {
        message: "يجب أن تملأ جميع الحقول",
      };
    }
    await prisma.question.create({
      data: {
        question: formData.get("question") as string,
        answer: formData.get("answer") as string,
        answerFirstLetter: formData.get("letter") as string,
        difficulty: formData.get("difficulty") as string,
        category: formData.get("category") as string,
        hint: formData.get("hint") as string,
      },
    });
  } catch (error) {
    return {
      message: "حدث خطأ أثناء إضافة السؤال",
    };
  }
}
