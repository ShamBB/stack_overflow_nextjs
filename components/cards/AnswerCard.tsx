import React from "react";
import Link from "next/link";
import { formatNumberWithExtension, multiFormatDateString } from "@/lib/utils";
import Metric from "../shared/Metric";
import EditDeleteAction from "../shared/EditDeleteAction";
import { SignedIn } from "@clerk/nextjs";

interface AnswerCardProps {
  clerkId: string | null | undefined;
  _id: string;
  question: {
    title: string;
    _id: string;
  };
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: AnswerCardProps) => {
  const showButtonAction = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] px-11 py-9 sm:px-11">
      <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
        {multiFormatDateString(createdAt.toISOString())}
      </span>
      <div className="flex justify-between">
        <Link href={`/question/${question._id}/#${_id}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 ">
            {question.title}
          </h3>
        </Link>

        <SignedIn>
          {showButtonAction && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${multiFormatDateString(createdAt.toISOString())}`}
          href={`/profile/${clerkId}`}
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
        </ul>
      </div>
    </div>
  );
};

export default AnswerCard;
