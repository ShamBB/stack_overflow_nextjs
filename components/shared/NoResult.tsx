"use client";

import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface NoResultProps {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: NoResultProps) => {
  const { mode } = useTheme() || {};
  return (
    <div className="m-auto mt-10 flex flex-col items-center justify-center gap-7">
      <Image
        src={
          mode === "light"
            ? "/assets/images/light-illustration.png"
            : "/assets/images/dark-illustration.png"
        }
        alt="No Result illustration"
        width={270}
        height={200}
        className="block object-contain"
      ></Image>
      <div className="flex flex-col items-center justify-center gap-[14px]">
        <h2 className="h2-bold text-dark200_light900">{title}</h2>
        <h3 className="body-regular text-dark500_light700 max-w-md">
          {description}
        </h3>
        <Link href={link}>
          <Button className="primary-gradient paragraph-medium rounded-lg px-7 py-3 text-light-900 ">
            {linkTitle}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoResult;
