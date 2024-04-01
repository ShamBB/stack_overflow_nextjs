import { AnswerFilters } from "@/constant/filters";
import { formatDateString } from "@/lib/utils";
import React from "react";
import ParseHTML from "./ParseHTML";
import { getAnswers } from "@/lib/actions/answer.action";
import Filter from "./Filter";
import Link from "next/link";
import Image from "next/image";
import Votes from "./Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({ questionId });

  return (
    <div className="mt-11">
      <div className="flex flex-wrap items-center justify-between">
        <h3 className="paragraph-medium primary-text-gradient">
          {totalAnswers} {totalAnswers > 1 ? "Answers" : "Answer"}
        </h3>

        <Filter
          filters={AnswerFilters}
          otherClasses="min-h-[36px] sm:min-w-[170px]"
        />
      </div>
      {result.map((answerObj) => {
        return (
          <article key={answerObj._id} className="light-border border-b py-10">
            <div
              className="mb-8 flex flex-col-reverse justify-between 
        gap-5 sm:flex-row sm:items-center sm:gap-2"
            >
              <Link
                href={`/profile/${answerObj.author.clerkId}`}
                className="flex items-center gap-1 sm:items-center"
              >
                <Image
                  src={answerObj.author.picture}
                  width={18}
                  height={18}
                  alt="profile picture"
                  className="rounded-full object-cover max-sm:mt-0.5"
                ></Image>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answerObj.author.name}
                  </p>
                  <p className="text-light400_light500 small-regular ml-0.5 mt-0.5 line-clamp-1">
                    answered{" "}
                    {formatDateString(answerObj.createdAt?.toISOString())}
                  </p>
                </div>
              </Link>

              <Votes
                itemId={JSON.stringify(answerObj._id)}
                userId={JSON.stringify(userId)}
                upvotes={answerObj.upvotes.length}
                hasupVoted={answerObj.upvotes.includes(userId)}
                downvotes={answerObj.downvotes.length}
                hasdownVoted={answerObj.downvotes.includes(userId)}
                type="Answer"
              />
            </div>
            <ParseHTML data={answerObj.content} />
          </article>
        );
      })}
    </div>
  );
};

export default AllAnswers;
