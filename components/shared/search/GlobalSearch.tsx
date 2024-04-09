"use client";

import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();
  // const [globalSearch, setGlobalSearch] = useState("");
  // const [texttoPass, settexttoPass] = useState("");

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);
  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (globalSearch) {
  //       router.push(pathname + "?" + createQueryString("global", globalSearch));
  //     } else {
  //       router.push(pathname);
  //     }
  //     settexttoPass(globalSearch);
  //   }, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [globalSearch, pathname, router, createQueryString]);

  // function handleChangeSearch(e: React.KeyboardEvent<HTMLInputElement>) {
  //   const textInput = e.target as HTMLInputElement;
  //   const textValue = textInput?.value.trim();
  //   setGlobalSearch(textValue);
  // }

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div
        className="background-light800_darkgradient relative flex min-h-[56px] 
      grow items-center gap-1 rounded-xl px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        ></Image>
        <Input
          type="text"
          placeholder="Search globally"
          className="paragraph-regular no-focus placeholder 
          background-light800_darkgradient 
          text-light400_light500 border-none shadow-none outline-none"
          onKeyUp={() => {}}
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
