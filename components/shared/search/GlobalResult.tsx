"use client";
import React, { useEffect, useState } from "react";
import GlobalFilter from "../GlobalFilter";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { globalSearch } from "@/lib/actions/global.action";

interface GlobalResultProps {
  onClickOutside: () => void;
}

const GlobalResult = ({ onClickOutside }: GlobalResultProps) => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const returnvalue = await globalSearch({ type, query: global });
        setResult(returnvalue ? JSON.parse(returnvalue) : []);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    if (global) {
      fetchData();
    }
  }, [global, type]);

  const renderlink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;

      default:
        return "/";
    }
  };

  return (
    <div
      className="absolute top-full z-10 mt-3 w-full rounded-xl 
      bg-light-800 py-5 shadow-sm dark:bg-dark-400"
    >
      <GlobalFilter />
      <div className="my-5 h-px bg-light-700/50 dark:bg-dark-500/50"></div>

      <div className="text-dark400_light900 paragraph-semibold space-y-5 px-5">
        <p>Top Match</p>

        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 size-10 animate-spin text-primary-500" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderlink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="flex w-full cursor-pointer items-start 
                  gap-3 px-5 py-2.5 
                  hover:bg-light-700/50 dark:bg-dark-500/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  ></Image>

                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400_light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops, no result found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
