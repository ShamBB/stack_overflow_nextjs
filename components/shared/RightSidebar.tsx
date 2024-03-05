import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const hotQuestions = [
  {
    _id: 1,
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  {
    _id: 2,
    title: "How can an airconditioning machine exist?",
  },
  {
    _id: 3,
    title: "Interrogated every time crossing UK Border as citizen",
  },
  {
    _id: 4,
    title: "Low digit addition generator",
  },
  {
    _id: 5,
    title: "What is an example of 3 numbers that do not make up a vector?",
  },
];

const popularTags = [
  {
    _id: 1,
    name: "JAVASCRIPT",
    count: 20152,
  },
  {
    _id: 2,
    name: "NEXT.js",
    count: 20152,
  },
  {
    _id: 3,
    name: "React.js",
    count: 20152,
  },
  {
    _id: 4,
    name: "Node.js",
    count: 20152,
  },
];

const RightSidebar = () => {
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
                totalQuestions={tag.count}
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
