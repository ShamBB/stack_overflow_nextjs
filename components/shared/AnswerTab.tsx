import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const AnswerTab = async ({ searchParams, clerkId, userId }: Props) => {
  const answer = await getUserAnswers({
    userId,
    page: 1,
  });

  return (
    <div className=" mt-5 flex flex-1 flex-col gap-6">
      {answer.answers.map((answerObj) => {
        return (
          <AnswerCard
            key={answerObj._id}
            _id={answerObj._id}
            clerkId={clerkId}
            question={answerObj.question}
            author={answerObj.author}
            upvotes={answerObj.upvotes}
            createdAt={answerObj.createdAt}
          />
        );
      })}
    </div>
  );
};

export default AnswerTab;
