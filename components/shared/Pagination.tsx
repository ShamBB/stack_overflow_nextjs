"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface Props {
  pageNumber: number;
  isLastPage: boolean;
  pageKey?: string;
}

const Pagination = ({ pageNumber, isLastPage, pageKey = "page" }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleNavigation(direction: string) {
    const newPage = direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    if (newPage === 1) {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [pageKey],
      });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: pageKey,
        value: newPage.toString(),
      });
      router.push(newUrl, { scroll: false });
    }
  }

  if (isLastPage && pageNumber === 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        onClick={() => handleNavigation("prev")}
        className="light-border-2 btn flex h-9 min-h-[36px] 
        items-center justify-center gap-2 rounded-md border 
        bg-slate-900 px-4 py-2 text-sm font-medium 
        text-slate-50 shadow transition-colors 
        hover:bg-slate-900/90 focus-visible:outline-none 
        focus-visible:ring-1 focus-visible:ring-slate-950 
        disabled:pointer-events-none disabled:opacity-50 
        dark:bg-slate-50 dark:text-slate-900 
        dark:hover:bg-slate-50/90 
        dark:focus-visible:ring-slate-300"
        disabled={pageNumber === 1}
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div
        className="flex items-center 
      justify-center rounded-md bg-primary-500 px-3.5 py-2"
      >
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        onClick={() => handleNavigation("next")}
        className="light-border-2 btn flex h-9 min-h-[36px] 
        items-center justify-center gap-2 rounded-md border 
        bg-slate-900 px-4 py-2 text-sm font-medium 
        text-slate-50 shadow transition-colors 
        hover:bg-slate-900/90 focus-visible:outline-none 
        focus-visible:ring-1 focus-visible:ring-slate-950 
        disabled:pointer-events-none disabled:opacity-50 
        dark:bg-slate-50 dark:text-slate-900 
        dark:hover:bg-slate-50/90 
        dark:focus-visible:ring-slate-300"
        disabled={isLastPage}
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
