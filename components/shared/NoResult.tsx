"use client";

import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface NoResultProps {
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

const NoResult = ({ title, description, link, buttonText }: NoResultProps) => {
  const { mode } = useTheme();
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-7">
      <Image
        src={
          mode === "light"
            ? "/assets/images/light-illustration.png"
            : "/assets/images/dark-illustration.png"
        }
        alt="illustration"
        width={269}
        height={200}
        className=""
      ></Image>
      <div className="flex flex-col items-center justify-center gap-[14px]">
        <h2 className="h3-bold text-dark200_light900">{title}</h2>
        <h3 className="body-regular text-dark500_light700 max-w-[381px]">
          {description}
        </h3>
        <Link href={link}>
          <Button className="primary-gradient paragraph-medium rounded-lg px-7 py-3 text-light-900">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoResult;
