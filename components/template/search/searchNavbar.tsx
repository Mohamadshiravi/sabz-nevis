"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function SearchNavbar() {
  const path = usePathname();
  const searchedWord = useSearchParams().get("q");

  return (
    <div className="select-none w-full text-sm flex items-center gap-3 border-b border-zinc-200 dark:border-b-zinc-700 mt-14">
      <Link
        href={`/search/posts?q=${searchedWord}`}
        className={`${
          `${path}?q=${searchedWord}` === `/search/posts?q=${searchedWord}`
            ? "text-myText-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-myText-800 dark:after:bg-white"
            : "text-myText-600 dark:text-zinc-200 dark:hover:text-white hover:text-myText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        پست ها
      </Link>
      <Link
        href={`/search/users?q=${searchedWord}`}
        className={`${
          `${path}?q=${searchedWord}` === `/search/users?q=${searchedWord}`
            ? "text-myText-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-myText-800 dark:after:bg-white"
            : "text-myText-600 dark:text-zinc-200 dark:hover:text-white hover:text-myText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        کاربران
      </Link>
      <Link
        href={`/search/lists?q=${searchedWord}`}
        className={`${
          `${path}?q=${searchedWord}` === `/search/lists?q=${searchedWord}`
            ? "text-myText-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-myText-800 dark:after:bg-white"
            : "text-myText-600 dark:text-zinc-200 dark:hover:text-white hover:text-myText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        لیست ها
      </Link>
      <Link
        href={`/search/categories?q=${searchedWord}`}
        className={`${
          `${path}?q=${searchedWord}` === `/search/categories?q=${searchedWord}`
            ? "text-myText-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-myText-800 dark:after:bg-white"
            : "text-myText-600 dark:text-zinc-200 dark:hover:text-white hover:text-myText-800 vazir-medium"
        } pb-2 px-2 text-nowrap relative transition`}
      >
        موضوع ها
      </Link>
    </div>
  );
}
