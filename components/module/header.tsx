"use client";

import Link from "next/link";
import { IoInformationCircleOutline, IoSearch } from "react-icons/io5";
import RegisterBtn from "../template/header/registerBtn";
import { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { fetchUserDataFromServer } from "@/redux/slices/user";
import { IoIosArrowDown } from "react-icons/io";
import { MdNotifications } from "react-icons/md";

export default function Header() {
  const [searchInp, setSearchInp] = useState("جستجو در ویرگول...");

  useEffect(() => {
    dispatch(fetchUserDataFromServer());
  }, []);

  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((state) => {
    return state.user;
  });

  return (
    <header
      className={`${
        userData ? "lg:sticky top-0 left-0" : "relative"
      } flex items-center justify-between bg-white md:px-6 px-2 py-2 border-b border-zinc-200 z-40`}
    >
      <Link href={"/"}>
        <img src="/images/logo.webp" className="w-[50px]" />
      </Link>
      <div className="rounded-full bg-zinc-100 text-sm items-center gap-3 px-3 py-1 md:flex hidden">
        <IoSearch className="text-xl" />
        <input
          id="search-inp"
          type="text"
          value={searchInp}
          onChange={(e) => setSearchInp(e.target.value)}
          className="bg-inherit w-[300px] outline-none py-1.5 text-zinc-400 focus:text-zinc-800 transition"
        />
      </div>
      <div className="flex gap-1 items-center text-sm">
        <button className="rounded-full bg-zinc-100 ml-1 text-2xl h-[40px] w-[40px] flex items-center justify-center">
          <IoInformationCircleOutline />
        </button>
        {!userData ? (
          <>
            <Link href={"login"} className="rounded-full px-4 py-1.5">
              ورود
            </Link>
            <RegisterBtn />
          </>
        ) : (
          <>
            <button className="rounded-full ml-6 bg-zinc-100 text-2xl ml-3 h-[40px] w-[40px] flex items-center justify-center">
              <MdNotifications />
            </button>
            <div className="flex items-center bg-zinc-100 h-[40px] py-1 pl-0.5 gap-2 rounded-full">
              <IoIosArrowDown className="mr-3 text-xs" />
              <img
                src="/images/avatar-default.jpg"
                className="rounded-full w-[35px] aspect-square"
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
