"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { removeKeysFromQuery, formUrlQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

interface FilterSearchProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({
  filters,
  otherClasses,
  containerClasses,
}: FilterSearchProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryText = searchParams.get("filter") || "";
  const [value, setValue] = useState(queryText);

  const handleChange = (newValue: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: newValue.toLowerCase(),
    });

    router.push(newUrl, { scroll: false });
    setValue(newValue);
  };

  return (
    <>
      <div className={`relative ${containerClasses}`}>
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger
            className={`background-light800_dark300 text-dark500_light700 
          light-border body-regular
          rounded-md bg-white px-5 py-2.5
          ring-black focus:outline-none focus:ring-1 focus:ring-offset-1 ${otherClasses}`}
          >
            <SelectValue placeholder="Select a Filter" />
          </SelectTrigger>
          <SelectContent
            className="light-border divide-solid border-2 bg-white 
        text-slate-950 dark:bg-slate-950 dark:text-slate-50"
          >
            <SelectGroup>
              {filters.map((filterObj) => (
                <SelectItem
                  key={filterObj.value}
                  value={filterObj.value}
                  className="text-slate-950 focus:bg-slate-100 dark:text-slate-50 dark:focus:bg-slate-800"
                >
                  {filterObj.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filter;
