import React from "react";
import GlobalFilter from "../GlobalFilter";

const GlobalResult = () => {
  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
      <div className="flex items-center gap-5 px-5">
        <p className="text-dark400_light900 body-medium">Type:</p>
        <div className="flex gap-3">
          <GlobalFilter />
        </div>
      </div>
    </div>
  );
};

export default GlobalResult;
