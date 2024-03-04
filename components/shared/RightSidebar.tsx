"use client";
import { sidebarLinks } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RightSidebar = () => {
  return (
    <section
      className="background-light900_dark200 light-border 
      custom-scrollbar light-border sticky right-0
      top-0 h-screen w-[330px] overflow-y-auto p-6 pt-40
      dark:shadow-none max-sm:hidden"
    >
      <div className="flex h-full flex-col gap-[60px] pt-1">
        <div>
          <h3 className="h3-bold text-dark200_light900">Hot Network</h3>
          <ul className="text-dark500_light700 body-medium flex flex-col gap-[30px] pt-[26px]">
            <div className="flex justify-between gap-2">
              <p>
                Would it be appropriate to point out an error in another paper
                during a referee report?
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="right arrow"
                width={20}
                height={20}
                className="invert-colors"
              ></Image>
            </div>

            <div className="flex justify-between gap-2">
              <p>How can an airconditioning machine exist?</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="right arrow"
                width={20}
                height={20}
                className="invert-colors"
              ></Image>
            </div>

            <div className="flex justify-between gap-2">
              <p>Interrogated every time crossing UK Border as citizen</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="right arrow"
                width={20}
                height={20}
                className="invert-colors"
              ></Image>
            </div>

            <div className="flex justify-between gap-2">
              <p>Low digit addition generator</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="right arrow"
                width={20}
                height={20}
                className="invert-colors"
              ></Image>
            </div>

            <div className="flex justify-between gap-2">
              <p>
                What is an example of 3 numbers that do not make up a vector?
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="right arrow"
                width={20}
                height={20}
                className="invert-colors"
              ></Image>
            </div>
          </ul>
        </div>

        <div>
          <h3 className="h3-bold text-dark200_light900">Popular tags</h3>
          <ul className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p>Javascript</p>
              <p>20152+</p>
            </div>
            <div className="flex justify-between">
              <p>Javascript</p>
              <p>20152+</p>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
