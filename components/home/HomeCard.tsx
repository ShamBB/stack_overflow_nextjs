import React from "react";
import Link from "next/link";
import { multiFormatDateString } from "@/lib/utils";
import RenderTag from "../shared/RenderTag";
import Image from "next/image";

interface HomeCardProps {
  questions: {
    id: number;
    title: string;
    description: string;
    votes: number;
    answers: number;
    views: number;
    createdBy: {
      id: number;
      name: string;
      avatar: string;
      time: string;
    };
    listOftags: { id: number; value: string }[];
  }[];
}

const HomeCard = ({ questions }: HomeCardProps) => {
  return (
    <div className="relative flex flex-1 flex-col gap-6">
      {questions.map((obj) => (
        <div
          key={obj.id}
          className="dark:dark-gradient light-border  rounded-[10px] bg-light-900 px-11 py-9"
        >
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {multiFormatDateString(obj.createdBy.time)}
          </span>
          <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
            {obj.title}
          </h3>
          <ul className="mb-6 mt-[14px] flex flex-wrap gap-2">
            {obj.listOftags.map((tagObj) => {
              return (
                <RenderTag
                  key={tagObj.id}
                  _id={tagObj.id}
                  name={tagObj.value}
                />
              );
            })}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              href={obj.createdBy.id.toString()}
              className="body-medium text-dark400_light800 flex cursor-pointer items-center gap-[5px]"
            >
              <Image
                src="/assets/icons/account.svg"
                width={20}
                height={20}
                alt="avatar picture "
                className="invert-colors rounded-full"
              ></Image>
              <span>
                {obj.createdBy.name}
                <span className="small-regular max-sm:hidden">
                  {" "}
                  &bull; asked {multiFormatDateString(obj.createdBy.time)}
                </span>
              </span>
            </Link>
            <ul className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <Image
                  src="/assets/icons/like.svg"
                  alt="like"
                  width={16}
                  height={16}
                  className="mr-[2px]"
                ></Image>
                <span className="small-regular text-dark400_light800">
                  {obj.votes} votest
                </span>
              </div>
              <div className="flex items-center">
                <Image
                  src="/assets/icons/message.svg"
                  alt="like"
                  width={16}
                  height={16}
                  className="mr-[2px]"
                ></Image>
                <span className="small-regular text-dark400_light800">
                  {obj.answers} answers
                </span>
              </div>
              <div className="flex items-center">
                <Image
                  src="/assets/icons/eye.svg"
                  alt="like"
                  width={16}
                  height={16}
                  className="mr-[2px]"
                ></Image>
                <span className="small-regular text-dark400_light800">
                  {obj.views} views
                </span>
              </div>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeCard;
