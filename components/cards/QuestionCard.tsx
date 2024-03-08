import React from "react";
import Link from "next/link";
import { formatNumberWithExtension, multiFormatDateString } from "@/lib/utils";
import RenderTag from "../shared/RenderTag";
import Image from "next/image";
import Metric from "../shared/Metric";

interface QuestionCardProps {
  question: {
    _id: string;
    title: string;
    tags: { _id: string; name: string }[];
    author: {
      _id: string;
      name: string;
      picture: string;
    };
    upvotes: number;
    views: number;
    answers: Array<object>;
    createdAt: Date;
  };
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] px-11 py-9 sm:px-11">
      <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
        {multiFormatDateString(question.createdAt.toISOString())}
      </span>
      <Link href={`/question/${question._id}`}>
        <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 ">
          {question.title}
        </h3>
      </Link>

      <ul className="mb-6 mt-3.5 flex flex-wrap gap-2">
        {question.tags.map((tagObj) => {
          return (
            <RenderTag key={tagObj._id} _id={tagObj._id} name={tagObj.name} />
          );
        })}
      </ul>

      <div className=" flex-between flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={question.author.name}
          title={` - asked ${multiFormatDateString(
            question.createdAt.toISOString()
          )}`}
          href={`/profiule/${question.author._id}`}
          iasAuthor
          textStyle="body-medium text-dark400_light700"
        />

        <ul className="flex flex-wrap gap-2">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatNumberWithExtension(question.upvotes)}
            title=" Votes"
            textStyle="small-regular text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumberWithExtension(question.answers.length)}
            title=" Answers"
            textStyle="small-regular text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumberWithExtension(question.views)}
            title=" Views"
            textStyle="small-regular text-dark400_light800"
          />
        </ul>
      </div>
    </div>
  );
};

export default QuestionCard;
