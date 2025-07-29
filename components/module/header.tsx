"use client";

import Link from "next/link";
import { IoMoonSharp, IoSearch } from "react-icons/io5";
import RegisterBtn from "../template/header/registerBtn";
import { ChangeEvent, useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { changeTheme, fetchUserDataFromServer } from "@/redux/slices/user";
import { MdSunny } from "react-icons/md";
import HeaderProfileBtn from "../template/header/headerProfileBtn";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { fetchListsFromServer } from "@/redux/slices/list";

export default function Header({ isTransparent }: { isTransparent?: boolean }) {
  const [searchInp, setSearchInp] = useState("");

  const FetchUserData = async () => {
    if (!userData.data && userData.error !== "unAuth") {
      dispatch(fetchUserDataFromServer());
    }

    if (!userLists) {
      dispatch(fetchListsFromServer());
    }
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((state) => {
    return state.user;
  });
  const loading = useTypedSelector((state) => {
    return state.user;
  }).loading;

  const { data: userLists } = useTypedSelector((state) => state.lists);

  function ChangeThemeHandler() {
    const theme = userData.theme === "dark" ? "light" : "dark";
    dispatch(changeTheme(theme));
  }

  const router = useRouter();

  return (
    <header
      className={`${
        userData.data ? "lg:sticky top-0 left-0" : "relative"
      } flex items-center justify-between md:px-6 px-2 py-2 ${
        !isTransparent
          ? "border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-dark-color-800"
          : "bg-transparent"
      } z-40`}
    >
      <Link href={"/home"}>
        <Image
          src="/images/sabz-logo.png"
          width={1000}
          height={1000}
          alt="logo"
          className="sm:w-[45px] w-[40px]"
        />
      </Link>
      <form
        onSubmit={SearchHandler}
        className="rounded-full bg-zinc-100 relative dark:bg-dark-color-700 text-sm items-center gap-3 px-3 py-1 md:flex hidden"
      >
        <IoSearch className="text-xl" />
        <input
          id="search-inp"
          type="text"
          placeholder="جست و جو در سبز نویس"
          value={searchInp}
          onChange={(e) => setSearchInp(e.target.value)}
          className="bg-inherit w-[300px] outline-hidden py-1.5"
        />
        {searchInp !== "" && (
          <button className="bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-white dark:hover:bg-zinc-200 rounded-full absolute left-1 dark:text-zinc-800 w-[30px] h-[30px] text-xl flex items-center justify-center">
            <IoIosArrowBack />
          </button>
        )}
      </form>
      <div className="flex gap-1 items-center text-sm">
        {!loading ? (
          <>
            {!userData.data ? (
              <>
                <Link href={"/login"} className="rounded-full px-4 py-1.5">
                  ورود
                </Link>
                <RegisterBtn />
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={ChangeThemeHandler}
                  className="p-2.5 flex bg-zinc-100 dark:bg-zinc-800 rounded-full items-center justify-between gap-4 dark:text-my-text-400 text-my-text-600"
                >
                  {userData.theme === "dark" ? (
                    <>
                      <IoMoonSharp className="text-xl" />
                    </>
                  ) : (
                    <>
                      <MdSunny className="text-xl" />
                    </>
                  )}
                </button>
                <HeaderProfileBtn />
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center">
            <button className="rounded-full ml-2 bg-zinc-200 dark:bg-zinc-800 text-2xl h-[40px] w-[150px] flex items-center justify-center"></button>
          </div>
        )}
      </div>
    </header>
  );
  function SearchHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchInp !== "") {
      router.push(`/search/posts?q=${searchInp}`);
    }
  }
}
