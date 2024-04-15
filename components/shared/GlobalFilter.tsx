"use client";
import { GlobalSearchFilters } from "@/constant/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const GlobalFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryText = searchParams.get("type") || "";
  const [active, setActive] = useState(queryText);

  function handleTypeClick(filteredString: string) {
    if (filteredString === active) {
      setActive("");
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["type"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(filteredString);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: filteredString.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  }

  return GlobalSearchFilters.map((e) => {
    return (
      <Button
        key={e.value}
        className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-light-800  ${
          active === e.value
            ? "bg-primary-500  text-light-800 "
            : "bg-light-700 text-dark-400 hover:text-primary-500  dark:bg-dark-500 dark:hover:text-primary-500 "
        }`}
        onClick={() => handleTypeClick(e.value)}
      >
        {e.name}
      </Button>
    );
  });
};

export default GlobalFilter;
