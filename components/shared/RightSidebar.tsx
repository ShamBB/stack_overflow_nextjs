import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { topTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await topTags();

  return (
    <section
      className="background-light900_dark200 light-border 
      custom-scrollbar light-border sticky right-0
      top-0 h-screen w-[330px] overflow-y-auto border-l p-6 pt-40
      dark:shadow-none max-xl:hidden"
    >
      <div className="flex flex-col gap-[60px] pt-1">
        <div>
          <h3 className="h3-bold text-dark200_light900">Hot Network</h3>
          <ul className="text-dark500_light700 body-medium flex flex-col gap-[30px] pt-[26px]">
            {hotQuestions.map((question) => (
              <Link
                href={`/question/${question._id}`}
                key={question._id}
                className="flex cursor-pointer items-start justify-between gap-7"
              >
                <p>{question.title}</p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert-colors "
                ></Image>
              </Link>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
          <ul className="mt-7 flex flex-col gap-4">
            {popularTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
