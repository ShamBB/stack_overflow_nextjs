"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queryText = searchParams.get("q") || "";
  const [search, setSearch] = useState(queryText);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [pathname, route, router, search, searchParams]);

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const textInput = e.target as HTMLInputElement;
    const textValue = textInput?.value;
    setSearch(textValue);
  }
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] 
  grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        ></Image>
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => handleChangeSearch(e)}
        className="paragraph-regular no-focus placeholder 
      text-dark400_light700
      border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        ></Image>
      )}
    </div>
  );
};

export default LocalSearchBar;
