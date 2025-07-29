"use client";

import Link from "next/link";
import { IoMoonSharp, IoSearch } from "react-icons/io5";
import { ChangeEvent, useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { changeTheme, fetchUserDataFromServer } from "@/redux/slices/user";
import { MdSunny } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AdminPanelNavbar from "./adminPanelNavbar";
import { HiMenuAlt3 } from "react-icons/hi";

export default function AdminPanelHeader() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const router = useRouter();

  return (
    <>
      {isMenuOpen && (
        <section
          onClick={() => setIsMenuOpen(false)}
          className="fixed top-0 left-0 h-screen w-full backdrop-blur-[5px] z-41 lg:hidden block"
        >
          <AdminPanelNavbar />
        </section>
      )}
      <header
        className="flex items-center justify-between md:px-6 px-2 py-2 
            border-b border-zinc-200 dark:border-zinc-800 sticky top-0 left-0 bg-white dark:bg-dark-color-800 z-40"
      >
        <Link href={"/home"} className="lg:block hidden">
          <Image
            src="/images/sabz-logo.png"
            width={1000}
            height={1000}
            alt="logo"
            className="sm:w-[45px] w-[40px]"
          />
        </Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden block text-3xl hover:text-zinc-500 transition"
        >
          <HiMenuAlt3 />
        </button>
        <div className="flex gap-1 items-center text-sm">
          {!loading ? (
            <>
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
                <Image
                  src={userData.data?.avatar || "/images/avatar-default.jpg"}
                  className="rounded-full w-[35px] aspect-square object-cover"
                  width={400}
                  height={400}
                  alt={"user avatar"}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <button className="rounded-full bg-zinc-200 dark:bg-zinc-800 text-2xl h-[40px] w-[100px] flex items-center justify-center"></button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
