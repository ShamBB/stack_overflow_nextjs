import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { multiFormatDateString } from "@/lib/utils";
import RenderTag from "../shared/RenderTag";
import Image from "next/image";

const HomeCard = () => {
  const timestamp = "2024-03-01T12:00:00";

  return (
    <div className="relative mt-4 flex flex-col gap-6">
      <div className="dark:dark-gradient light-border  rounded-[10px] bg-light-900 px-11 py-9">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {multiFormatDateString(timestamp)}
        </span>
        <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
          The Lightning Component c:LWC_PizzaTracker generated invalid output
          for field status. Error How to solve this
        </h3>
        <ul className="mb-6 mt-[14px] flex flex-wrap gap-2">
          <RenderTag _id={1} name="abu" />
          <RenderTag _id={2} name="ali" />
          <RenderTag _id={3} name="angah" />
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="#"
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
              Ahmad Shamsyahiran{" "}
              <span className="max-sm:hidden">&bull; asked 2 mins</span>
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
                1.2k votest
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
                900 answers
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
                5.2k views
              </span>
            </div>
          </ul>
        </div>
      </div>

      <div className="dark:dark-gradient light-border  rounded-[10px] bg-light-900 px-11 py-9">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {multiFormatDateString(timestamp)}
        </span>
        <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
          The Lightning Component c:LWC_PizzaTracker generated invalid output
          for field status. Error How to solve this
        </h3>
        <ul className="mb-6 mt-[14px] flex flex-wrap gap-2">
          <RenderTag _id={1} name="abu" />
          <RenderTag _id={2} name="ali" />
          <RenderTag _id={3} name="angah" />
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="#"
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
              Ahmad Shamsyahiran{" "}
              <span className="max-sm:hidden">&bull; asked 2 mins</span>
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
                1.2k votest
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
                900 answers
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
                5.2k views
              </span>
            </div>
          </ul>
        </div>
      </div>

      <div className="dark:dark-gradient light-border  rounded-[10px] bg-light-900 px-11 py-9">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {multiFormatDateString(timestamp)}
        </span>
        <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
          The Lightning Component c:LWC_PizzaTracker generated invalid output
          for field status. Error How to solve this
        </h3>
        <ul className="mb-6 mt-[14px] flex flex-wrap gap-2">
          <RenderTag _id={1} name="abu" />
          <RenderTag _id={2} name="ali" />
          <RenderTag _id={3} name="angah" />
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="#"
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
              Ahmad Shamsyahiran{" "}
              <span className="max-sm:hidden">&bull; asked 2 mins</span>
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
                1.2k votest
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
                900 answers
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
                5.2k views
              </span>
            </div>
          </ul>
        </div>
      </div>

      <div className="dark:dark-gradient light-border  rounded-[10px] bg-light-900 px-11 py-9">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {multiFormatDateString(timestamp)}
        </span>
        <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
          The Lightning Component c:LWC_PizzaTracker generated invalid output
          for field status. Error How to solve this
        </h3>
        <ul className="mb-6 mt-[14px] flex flex-wrap gap-2">
          <RenderTag _id={1} name="abu" />
          <RenderTag _id={2} name="ali" />
          <RenderTag _id={3} name="angah" />
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="#"
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
              Ahmad Shamsyahiran{" "}
              <span className="max-sm:hidden">&bull; asked 2 mins</span>
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
                1.2k votest
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
                900 answers
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
                5.2k views
              </span>
            </div>
          </ul>
        </div>
      </div>

      <div className="dark:dark-gradient light-border  rounded-[10px] bg-light-900 px-11 py-9">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {multiFormatDateString(timestamp)}
        </span>
        <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
          The Lightning Component c:LWC_PizzaTracker generated invalid output
          for field status. Error How to solve this
        </h3>
        <ul className="mb-6 mt-[14px] flex flex-wrap gap-2">
          <RenderTag _id={1} name="abu" />
          <RenderTag _id={2} name="ali" />
          <RenderTag _id={3} name="angah" />
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="#"
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
              Ahmad Shamsyahiran{" "}
              <span className="max-sm:hidden">&bull; asked 2 mins</span>
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
                1.2k votest
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
                900 answers
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
                5.2k views
              </span>
            </div>
          </ul>
        </div>
      </div>

      <div className="dark:dark-gradient light-border  rounded-[10px] bg-light-900 px-11 py-9">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {multiFormatDateString(timestamp)}
        </span>
        <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
          The Lightning Component c:LWC_PizzaTracker generated invalid output
          for field status. Error How to solve this
        </h3>
        <ul className="mb-6 mt-[14px] flex flex-wrap gap-2">
          <RenderTag _id={1} name="abu" />
          <RenderTag _id={2} name="ali" />
          <RenderTag _id={3} name="angah" />
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="#"
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
              Ahmad Shamsyahiran{" "}
              <span className="max-sm:hidden">&bull; asked 2 mins</span>
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
                1.2k votest
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
                900 answers
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
                5.2k views
              </span>
            </div>
          </ul>
        </div>
      </div>

      <div className="dark:dark-gradient light-border  rounded-[10px] bg-light-900 px-11 py-9">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {multiFormatDateString(timestamp)}
        </span>
        <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
          The Lightning Component c:LWC_PizzaTracker generated invalid output
          for field status. Error How to solve this
        </h3>
        <ul className="mb-6 mt-[14px] flex flex-wrap gap-2">
          <RenderTag _id={1} name="abu" />
          <RenderTag _id={2} name="ali" />
          <RenderTag _id={3} name="angah" />
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="#"
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
              Ahmad Shamsyahiran{" "}
              <span className="max-sm:hidden">&bull; asked 2 mins</span>
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
                1.2k votest
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
                900 answers
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
                5.2k views
              </span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
