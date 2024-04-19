import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import React from "react";

const Loading = () => {
  return (
    <section>
      <div
        className="flex w-full  flex-col-reverse 
  justify-between gap-4 sm:flex-row sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div
        className="mt-11 flex flex-col justify-between gap-7 
max-sm:flex-col md:items-stretch"
      >
        <div className="flex flex-row gap-5 max-sm:flex-col">
          <Skeleton
            className=" flex min-h-[56px] 
  flex-1 grow items-center gap-4 rounded-[10px] px-4"
          />

          <Skeleton
            className="text-dark500_light700 light-border body-regular hidden min-h-[56px]  
           rounded-md
          bg-white  px-5
          py-2.5 ring-black max-md:flex sm:min-w-[170px]"
          />
        </div>
        <div className="flex gap-3  max-md:hidden">
          <Skeleton
            className="body-medium h-[40px]
                w-[94px] rounded-lg border border-none shadow-none"
          />
          <Skeleton
            className="body-medium h-[40px]
                w-[94px] rounded-lg border border-none shadow-none"
          />
          <Skeleton
            className="body-medium h-[40px]
                w-[94px] rounded-lg border border-none shadow-none"
          />
          <Skeleton
            className="body-medium h-[40px]
                w-[94px] rounded-lg border border-none shadow-none"
          />
        </div>

        <div className=" mt-2 flex flex-1 flex-col  gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <Skeleton key={item} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
