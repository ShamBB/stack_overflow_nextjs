import React from "react";
import QuestionCard from "../cards/QuestionCard";
import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, clerkId, userId }: Props) => {
  const question = await getUserQuestions({
    userId,
    page: 1,
  });
  return (
    <>
      {question.questions.map((question) => {
        return (
          <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
            clerkId={clerkId}
          />
        );
      })}
    </>
  );
};

export default QuestionTab;
