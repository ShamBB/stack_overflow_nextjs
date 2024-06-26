"use client";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { usePathname } from "next/navigation";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "../ui/use-toast";

interface Props {
  questionId: string;
  mongoseUserId: string;
}

const Answer = ({ questionId, mongoseUserId }: Props) => {
  const { mode } = useTheme();

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const editorRef = useRef(null);
  const pathname = usePathname();

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function handleCreateAnswer(values: z.infer<typeof AnswerSchema>) {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        question: JSON.parse(questionId),
        author: JSON.parse(mongoseUserId),
        path: pathname,
      });
      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }

      toast({
        description: "Answer Successfully created",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleEditorChange = (content: string, editor: any) => {
    form.setValue("answer", editor.getContent().trim());
  };

  // const generateAiAnswer = async () => {
  //   if (!mongoseUserId) return;
  //   setIsSubmittingAI(true);
  //   try {
  //     // API call
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSubmittingAI(false);
  //   }
  // };

  return (
    <div>
      <div
        className="flex flex-col justify-between gap-5 
      sm:flex-row sm:items-center sm:gap-2"
      >
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        {/* <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 
        text-primary-500 shadow-none dark:text-primary-500"
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="star icon"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate AI Answer
        </Button> */}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateAnswer)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="primary-gradient w-fit text-white">
              {isSubmitting ? "Submitting..." : "Post Answer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
