"use client";
import { HomePageFilters } from "@/constant/filters";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryText = searchParams.get("filter") || "";
  const [active, setActive] = useState(queryText);

  function handleTypeClick(filteredString: string) {
    if (filteredString === active) {
      setActive("");
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(filteredString);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filteredString.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  }

  return (
    <div className="flex gap-3  max-md:hidden">
      {HomePageFilters.map((filterObj) => (
        <Button
          key={filterObj.value}
          onClick={() => handleTypeClick(filterObj.value)}
          className={`body-medium rounded-lg
                border border-none px-6 py-3 capitalize text-primary-500 shadow-none
                ${
                  active === filterObj.value
                    ? "bg-primary-100 text-primary-500 dark:bg-dark-400"
                    : "background-light800_dark300 text-light-500"
                }`}
        >
          {filterObj.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
