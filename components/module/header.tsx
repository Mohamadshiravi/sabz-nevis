"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoInformationCircleOutline, IoSearch } from "react-icons/io5";
import RegisterBtn from "../template/header/registerBtn";
import { useState } from "react";

export default function Header() {
  const path = usePathname();
  const invalidUrl = /^\/(login|register)$/;

  const [searchInp, setSearchInp] = useState("جستجو در ویرگول...");

  return (
    !invalidUrl.test(path) && (
      <header
        className={`flex items-center justify-between bg-white md:px-6 px-2 py-2`}
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
          <button className="rounded-full p-2 bg-zinc-100 text-2xl ml-3">
            <IoInformationCircleOutline />
          </button>
          <Link href={"login"} className="rounded-full px-4 py-1.5">
            ورود
          </Link>
          <RegisterBtn />
        </div>
      </header>
    )
  );
}
