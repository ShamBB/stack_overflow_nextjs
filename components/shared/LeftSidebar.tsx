"use client";

import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constant";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <section
      className="background-light900_dark200 light-border 
      custom-scrollbar light-border sticky left-0
      top-0 h-screen overflow-y-auto p-6 pt-36 dark:shadow-none
      max-sm:hidden lg:w-[266px]"
    >
      <div className="flex h-full flex-col gap-6 pt-1">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={isActive ? "" : "invert-colors"}
              ></Image>
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}

        <SignedOut>
          <div className="mt-auto flex flex-col gap-3 ">
            <Link href="/sign-in">
              <Button
                className="small-medium btn-secondary min-h-[41px] 
              w-full rounded-lg px-4 py-3 shadow-none"
              >
                <span className="primary-text-gradient max-lg:hidden">
                  Log in
                </span>
                <Image
                  src="/assets/icons/account.svg"
                  width={20}
                  height={20}
                  alt="logout"
                  className="invert-colors lg:hidden"
                ></Image>
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button
                className="small-medium light-border-2 
                  btn-tertiary text-dark400_light900 min-h-[41px] 
                  w-full rounded-lg px-4 py-3 shadow-none "
              >
                <span className="max-lg:hidden">Sign Up</span>

                <Image
                  src="/assets/icons/sign-up.svg"
                  width={20}
                  height={20}
                  alt="logout"
                  className="invert-colors lg:hidden"
                ></Image>
              </Button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <Button
            onClick={() => signOut(() => router.push("/"))}
            className="text-dark300_light900 mt-auto 
          flex items-center 
          justify-start gap-4 bg-transparent p-4"
          >
            <Image
              src="/assets/icons/Logout.svg"
              width={20}
              height={20}
              alt="logout"
              className="invert-colors-2"
            ></Image>
            <p className="base-medium  max-lg:hidden">Logout</p>
          </Button>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
