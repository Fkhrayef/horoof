"use client";

import { getQuestion } from "@/actions/actions";
import FilterFormBtn from "./filter-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useState } from "react";
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
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import { CATEGORIES, DIFFICULTIES } from "@/lib/constants";
import { toast } from "sonner";
import { useQuestionContext } from "@/lib/hooks";

export default function FilterForm() {
  const { handleChangeSelectedQuestion } = useQuestionContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(CATEGORIES);
  const [selectedDifficulties, setSelectedDifficulties] =
    useState<string[]>(DIFFICULTIES);

  const formSchema = z.object({
    letter: z
      .string()
      .length(1, { message: "يجب أن تدخل حرفاً واحداً فقط" })
      .regex(/^[ابتثجحخدذرزسشصضطظعغفقكلمنهوي]$/, {
        message: "يجب أن يكون الحرف من الأبجدية العربية",
      }),
    difficulty: z.array(z.enum(DIFFICULTIES as [string, ...string[]])).min(1, {
      message: "يجب أن تختار صعوبة واحدة على الأقل",
    }),
    category: z.array(z.enum(CATEGORIES as [string, ...string[]])).min(1, {
      message: "يجب أن تختر فئة واحدة على الأقل",
    }),
    answeredBefore: z.enum(["نعم", "لا", "لا يهم"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letter: "",
      category: selectedCategories,
      difficulty: selectedDifficulties,
      answeredBefore: "لا يهم",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const { data, message } = await getQuestion(values);
    if (message) {
      toast.warning(message);
      console.log(message);
      return;
    } else if (!data) {
      toast.error("لم يتم العثور على أسئلة تطابق معايير البحث");
      return;
    }
    handleChangeSelectedQuestion(data.id);
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col  p-2 w-full gap-2 text-right"
      >
        {/* الحرف */}
        <FormField
          control={form.control}
          name="letter"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-accent font-semibold">
                  الحرف
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="أدخل الحرف"
                    type="text"
                    className="text-right w-full"
                    maxLength={1}
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
              <FormItem className="flex flex-col items-end">
                <FormLabel className="text-accent font-semibold">
                  مستوى الصعوبة
                </FormLabel>
                <FormControl>
                  <MultiSelector
                    values={selectedDifficulties}
                    onValuesChange={(values) => {
                      setSelectedDifficulties(values);
                      field.onChange(values);
                    }}
                    loop
                    className="w-full"
                  >
                    <MultiSelectorTrigger className="flex justify-end">
                      <MultiSelectorInput
                        placeholder="اختر الصعوبة"
                        className="text-right"
                      />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {DIFFICULTIES.map((difficulty) => (
                          <MultiSelectorItem
                            key={difficulty}
                            value={difficulty}
                          >
                            {difficulty}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
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
              <FormItem className="flex flex-col items-end">
                <FormLabel className="text-accent font-semibold">
                  الفئة
                </FormLabel>
                <FormControl>
                  <MultiSelector
                    values={selectedCategories}
                    onValuesChange={(values) => {
                      setSelectedCategories(values);
                      field.onChange(values);
                    }}
                    loop
                    className="w-full"
                  >
                    <MultiSelectorTrigger className="flex justify-end">
                      <MultiSelectorInput
                        placeholder="اختر الفئة"
                        className="text-right"
                      />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {CATEGORIES.map((category) => (
                          <MultiSelectorItem key={category} value={category}>
                            {category}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* تمت الاجابة عليه من قبل */}
        <FormField
          control={form.control}
          name="answeredBefore"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-semibold">
                  تمت الاجابة عليه من قبل؟
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-around"
                  >
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="all">لا يهم</Label>
                      <RadioGroupItem value="لا يهم" id="all" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="yes">نعم</Label>
                      <RadioGroupItem value="نعم" id="yes" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="no">لا</Label>
                      <RadioGroupItem value="لا" id="no" />
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FilterFormBtn isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
}
