import { Skeleton } from "@/components/ui/skeleton";

import React from "react";

const Loading = () => {
  return (
    <section>
      <div
        className="flex w-full  flex-col-reverse 
  justify-between gap-4 sm:flex-row sm:items-center"
      >
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
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

        <section className="mt-2 flex flex-1 flex-wrap gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <Skeleton
              key={item}
              className="flex h-[284px] w-full flex-col gap-5 rounded-2xl 
              p-8 max-xs:min-w-full xs:w-[260px]"
            />
          ))}
        </section>
      </div>
    </section>
  );
};

export default Loading;
