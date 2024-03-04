import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

interface prop {
  _id: number;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: prop) => {
  return (
    <Link
      href={`tags/${_id}`}
      className="flex items-baseline justify-between gap-2"
    >
      <Badge
        className="subtle-medium text-light400_light500 
  background-light800_dark300 rounded-md border-none px-4 py-2 uppercase"
      >
        {name}
      </Badge>
      {showCount && (
        <p className="text-dark500_light700 small-medium">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
