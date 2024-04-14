import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
// import { useRouter } from "next/navigation";

interface prop {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: prop) => {
  // const { push } = useRouter();
  // const handleClickTag = (event: React.MouseEvent<HTMLDivElement>) => {
  //   event.stopPropagation();
  //   push(`tags/${_id}`);
  // };

  return (
    <Link
      href={`/tags/${_id}`}
      className="flex cursor-pointer items-baseline justify-between gap-2"
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
