"use client";

import Link from "next/link";
import {
  IoInformationCircleOutline,
  IoMoonSharp,
  IoSearch,
} from "react-icons/io5";
import RegisterBtn from "../template/header/registerBtn";
import { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { changeTheme, fetchUserDataFromServer } from "@/redux/slices/user";
import { MdNotifications, MdSunny } from "react-icons/md";
import HeaderProfileBtn from "../template/header/headerProfileBtn";
import Image from "next/image";

export default function Header({ isTransparent }: { isTransparent?: boolean }) {
  const [searchInp, setSearchInp] = useState("جستجو در سبز نویس...");
  const [loading, setLoading] = useState(true);

  const FetchUserData = async () => {
    if (userData.data === null) {
      await dispatch(fetchUserDataFromServer());
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((state) => {
    return state.user;
  });

  function ChangeThemeHandler() {
    const theme = userData.theme === "dark" ? "light" : "dark";
    dispatch(changeTheme(theme));
  }

  return (
    <header
      className={`${
        userData.data ? "lg:sticky top-0 left-0" : "relative"
      } flex items-center justify-between md:px-6 px-2 py-2 ${
        !isTransparent
          ? "border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-darkColor-800"
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
      <div className="rounded-full bg-zinc-100 dark:bg-darkColor-700 text-sm items-center gap-3 px-3 py-1 md:flex hidden">
        <IoSearch className="text-xl" />
        <input
          id="search-inp"
          type="text"
          value={searchInp}
          onChange={(e) => setSearchInp(e.target.value)}
          className="bg-inherit w-[300px] outline-none py-1.5 text-zinc-400 focus:text-zinc-800"
        />
      </div>
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
                  className="p-2.5 flex bg-zinc-100 dark:bg-zinc-800 rounded-full items-center justify-between gap-4 dark:text-myText-400 text-myText-600"
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
            <button className="rounded-full ml-2 bg-zinc-100 dark:bg-zinc-800 text-2xl h-[40px] w-[150px] flex items-center justify-center"></button>
          </div>
        )}
      </div>
    </header>
  );
}
