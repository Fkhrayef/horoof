"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, DIFFICULTIES } from "@/lib/constants";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useEffect } from "react";
import { toast } from "sonner";
import { addQuestion } from "@/actions/actions";
import AddQuestionFormBtn from "./add-question-form-btn";

export default function AddQuestionForm() {
  const formSchema = z.object({
    question: z.string().min(1, { message: "يجب أن تدخل سؤالاً" }),
    answer: z.string().min(1, { message: "يجب أن تدخل إجابة" }),
    letter: z
      .string()
      .length(1, { message: "يجب أن تدخل حرفاً واحداً فقط" })
      .regex(/^[ابتثجحخدذرزسشصضطظعغفقكلمنهوي]$/, {
        message: "يجب أن يكون الحرف من الأبجدية العربية",
      }),
    difficulty: z.enum(DIFFICULTIES as [string, ...string[]], {
      required_error: "يجب أن تختر مستوى صعوبة السؤال",
    }),
    category: z.enum(CATEGORIES as [string, ...string[]], {
      required_error: "يجب أن تختر فئة السؤال",
    }),
    hint: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
      letter: "",
      hint: "",
    },
  });

  // Watch the answer field to get the first letter
  const answer = form.watch("answer");

  // Update letter whenever answer changes
  useEffect(() => {
    if (answer) {
      const firstLetter = answer.startsWith("ال") ? answer[2] : answer[0];
      form.setValue("letter", firstLetter);
    } else {
      form.setValue("letter", "");
    }
  }, [answer, form]);

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          formData.append("difficulty", form.getValues("difficulty"));
          formData.append("category", form.getValues("category"));
          const error = await addQuestion(formData);
          if (error) {
            toast.warning(error.message);
            return;
          }
          toast.success("تم إضافة السؤال بنجاح");
          form.reset();
        }}
        className="flex flex-col p-2 w-full gap-4 text-right"
      >
        {/* السؤال */}
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => {
            return (
              <FormItem className="space-y-3">
                <FormLabel className="text-accent font-semibold">
                  السؤال
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="أدخل السؤال"
                    className="text-right w-full"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* الإجابة */}
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => {
            return (
              <FormItem className="space-y-3">
                <FormLabel className="text-accent font-semibold">
                  الإجابة
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="أدخل الإجابة سواء بأل التعريف أو بدونها"
                    type="text"
                    className="text-right w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* الحرف */}
        <FormField
          control={form.control}
          name="letter"
          render={({ field }) => {
            return (
              <FormItem className="space-y-3">
                <FormLabel className="text-accent font-semibold">
                  الحرف الأول
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="يتجاهل أل التعريف تلقائي"
                    type="text"
                    className="text-right w-full"
                    maxLength={1}
                    readOnly
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* الصعوبة */}
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => {
            return (
              <FormItem className="space-y-3">
                <FormLabel className="text-accent font-semibold">
                  مستوى الصعوبة
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex justify-around"
                  >
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="hard">صعب</Label>
                      <RadioGroupItem value="صعب" id="hard" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="medium">متوسط</Label>
                      <RadioGroupItem value="متوسط" id="medium" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="easy">سهل</Label>
                      <RadioGroupItem value="سهل" id="easy" />
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* الفئة */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem className="space-y-3">
                <FormLabel className="text-accent font-semibold">
                  الفئة
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="flex flex-col items-end"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* تلميح */}
        <FormField
          control={form.control}
          name="hint"
          render={({ field }) => {
            return (
              <FormItem className="space-y-3">
                <FormLabel className="text-accent font-semibold">
                  تلميح (اختياري)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="أدخل التلميح"
                    type="text"
                    className="text-right w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <AddQuestionFormBtn />
      </form>
    </Form>
  );
}
