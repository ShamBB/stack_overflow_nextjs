"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { themes } from "@/constant";
const Theme = () => {
  const themeContext = useTheme();

  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { mode, setMode } = themeContext;

  function handleChangeTheme(modeValue: string) {
    setMode(modeValue);
    if (modeValue !== "system") {
      localStorage.theme = modeValue;
    } else {
      localStorage.removeItem("theme");
    }
  }

  return (
    <Menubar
      className="relative border-none 
    bg-transparent shadow-none"
    >
      <MenubarMenu>
        <MenubarTrigger
          className="focus:bg-light-900
         data-[state=open]:bg-light-900
          dark:focus:bg-dark-200 
          dark:data-[state=open]:bg-dark-200"
        >
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              height={20}
              width={20}
              className="active-theme"
            ></Image>
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              height={20}
              width={20}
              className="active-theme"
            ></Image>
          )}
        </MenubarTrigger>
        <MenubarContent
          className="background-light900_dark300 absolute 
            right-[-3rem] mt-3 
            min-w-[120px] rounded border
            py-2 
            dark:border-dark-400"
        >
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              className="focus:background-light800_dark400 flex items-center gap-4 px-2.5 py-2"
              onClick={() => handleChangeTheme(theme.value)}
            >
              <Image
                src={theme.icon}
                alt={theme.value}
                width={16}
                height={16}
                className={`${mode === theme.value && "active-theme"}`}
              ></Image>
              <p
                className={`body-semibold text-light-500 ${
                  mode === theme.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
