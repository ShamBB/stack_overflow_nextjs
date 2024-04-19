"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queryText = searchParams.get("global") || "";
  const [search, setSearch] = useState(queryText);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (queryText) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [pathname, queryText, router, search, searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    setIsOpen(false);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [pathname]);

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const textInput = e.target as HTMLInputElement;
    const textValue = textInput?.value;
    setSearch(textValue);
  }

  return (
    <div ref={ref} className="relative w-full max-w-[600px] max-lg:hidden">
      <div
        className="background-light800_darkgradient relative flex min-h-[56px] 
      grow items-center gap-1 rounded-xl px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        ></Image>
        <Input
          type="text"
          placeholder="Search globally"
          className="paragraph-regular no-focus placeholder 
          text-light400_light500
          border-none bg-transparent shadow-none outline-none"
          value={search}
          onChange={(e) => {
            handleChangeSearch(e);

            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) {
              setIsOpen(false);
            }
          }}
        />
      </div>
      {isOpen && (
        <GlobalResult
          onClickOutside={() => {
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default GlobalSearch;
