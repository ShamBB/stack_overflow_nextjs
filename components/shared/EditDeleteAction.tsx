"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({ path: pathname, questionId: JSON.parse(itemId) });
    } else if (type === "Answer") {
      await deleteAnswer({ path: pathname, answerId: JSON.parse(itemId) });
    }
  };
  return (
    <div className=" flex items-center gap-3">
      {type === "Question" && (
        <Image
          alt="edit"
          src="/assets/icons/edit.svg"
          width={14}
          height={14}
          className="cursor-pointer object-cover"
        />
      )}

      <Image
        alt="delete"
        src="/assets/icons/trash.svg"
        width={14}
        height={14}
        className="cursor-pointer object-cover"
        onClick={() => handleDelete()}
      />
    </div>
  );
};

export default EditDeleteAction;
