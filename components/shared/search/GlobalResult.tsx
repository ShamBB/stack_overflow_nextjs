import React, { useEffect, useRef } from "react";
import GlobalFilter from "../GlobalFilter";

interface GlobalResultProps {
  onClickOutside: () => void; // Assuming onClickOutside is always provided
}

const GlobalResult = (props: GlobalResultProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div
      ref={ref}
      className="absolute top-full z-10 mt-3 w-full rounded-xl 
      bg-light-800 py-5 shadow-sm dark:bg-dark-400"
    >
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
