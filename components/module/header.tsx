"use client";

import Link from "next/link";
import { IoInformationCircleOutline, IoSearch } from "react-icons/io5";
import RegisterBtn from "../template/header/registerBtn";
import { useCallback, useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { fetchUserDataFromServer } from "@/redux/slices/user";
import { IoIosArrowDown } from "react-icons/io";
import { MdNotifications } from "react-icons/md";
import HeaderProfileBtn from "./headerProfileBtn";

export default function Header({ isTransparent }: { isTransparent?: boolean }) {
  const [searchInp, setSearchInp] = useState("جستجو در ویرگول...");
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

  return (
    <header
      className={`${
        userData ? "lg:sticky top-0 left-0" : "relative"
      } flex items-center justify-between md:px-6 px-2 py-2 ${
        !isTransparent
          ? "border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-darkColor-800"
          : "bg-inherit"
      } z-40`}
    >
      <Link href={"/"}>
        <img src="/images/logo.webp" className="w-[50px]" />
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
            <button className="rounded-full bg-zinc-100 dark:bg-darkColor-700 ml-1 text-2xl h-[40px] w-[40px] flex items-center justify-center">
              <IoInformationCircleOutline />
            </button>
            {!userData.data ? (
              <>
                <Link href={"login"} className="rounded-full px-4 py-1.5">
                  ورود
                </Link>
                <RegisterBtn />
              </>
            ) : (
              <>
                <button className="rounded-full bg-zinc-100 dark:bg-darkColor-700 text-2xl md:ml-3 ml-1 h-[40px] w-[40px] flex items-center justify-center">
                  <MdNotifications />
                </button>
                <HeaderProfileBtn />
              </>
            )}
          </>
        ) : (
          <div className="flex items-center">
            <button className="rounded-full ml-2 bg-zinc-100 dark:bg-zinc-800 text-2xl h-[40px] w-[40px] flex items-center justify-center"></button>
            <button className="rounded-full ml-6 bg-zinc-100 dark:bg-zinc-800 text-2xl h-[40px] w-[40px] flex items-center justify-center"></button>
            <button className="rounded-full bg-zinc-100 dark:bg-zinc-800 text-2xl h-[40px] w-[80px] flex items-center justify-center"></button>
          </div>
        )}
      </div>
    </header>
  );
}
