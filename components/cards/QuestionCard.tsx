import React from "react";
import Link from "next/link";
import { formatNumberWithExtension, multiFormatDateString } from "@/lib/utils";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import EditDeleteAction from "../shared/EditDeleteAction";
import { SignedIn } from "@clerk/nextjs";

interface QuestionCardProps {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  hasSaved?: boolean;
  clerkId?: string | null;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
  hasSaved,
  clerkId,
}: QuestionCardProps) => {
  const showButtonAction = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] px-11 py-9 sm:px-11">
      <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
        {multiFormatDateString(createdAt.toISOString())}
      </span>
      <div className="flex w-full justify-between align-baseline max-xs:flex-col-reverse">
        <Link href={`/question/${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 ">
            {title}
          </h3>
        </Link>
        <SignedIn>
          {showButtonAction && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <ul className="mb-6 mt-3.5 flex flex-wrap gap-2">
        {tags.map((tagObj) => {
          return (
            <RenderTag key={tagObj._id} _id={tagObj._id} name={tagObj.name} />
          );
        })}
      </ul>

      <div className=" flex-between flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${multiFormatDateString(createdAt.toISOString())}`}
          href={`/profile/${author.clerkId}`}
          iasAuthor
          textStyle="body-medium text-dark400_light700"
        />

        <ul className="flex flex-wrap gap-2">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatNumberWithExtension(upvotes.length)}
            title=" Votes"
            textStyle="small-regular text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumberWithExtension(answers.length)}
            title=" Answers"
            textStyle="small-regular text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumberWithExtension(views)}
            title=" Views"
            textStyle="small-regular text-dark400_light800"
          />
        </ul>
      </div>
    </div>
  );
};

export default QuestionCard;
