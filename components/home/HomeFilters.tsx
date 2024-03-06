"use client";
import { HomePageFilters } from "@/constant/filters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const active = "newest";
  return (
    <div className="flex gap-3  max-md:hidden">
      {HomePageFilters.map((filterObj) => (
        <Button
          key={filterObj.value}
          onClick={() => {}}
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
