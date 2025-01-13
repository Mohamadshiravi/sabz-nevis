"use client";

import { changeTheme } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import ShowSwal from "@/utils/modalFunctions";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMoonSharp } from "react-icons/io5";
import { MdSunny } from "react-icons/md";

export default function PostHeaderProfileBtn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMount, setIsMenuMount] = useState(false);

  const userData = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  function ChangeThemeHandler() {
    const theme = userData.theme === "dark" ? "light" : "dark";
    dispatch(changeTheme(theme));
    AnimateToggleModal();
  }

  function AnimateToggleModal() {
    if (isMenuMount) {
      setIsMenuOpen(false);
      setTimeout(() => {
        setIsMenuMount(false);
      }, 200);
    } else {
      setIsMenuMount(true);
      setTimeout(() => {
        setIsMenuOpen(true);
      }, 20);
    }
  }

  return (
    <>
      {isMenuOpen && (
        <section
          onClick={AnimateToggleModal}
          className="fixed top-0 left-0 w-full h-screen"
        ></section>
      )}
      <div className="relative h-[40px]">
        <button
          onClick={AnimateToggleModal}
          className="flex items-center bg-zinc-100 cursor-pointer dark:bg-darkColor-700 h-full py-1 pl-0.5 gap-2 rounded-full"
        >
          <img
            src="/images/avatar-default.jpg"
            className="rounded-full w-[35px] aspect-square"
          />
        </button>
        {isMenuMount && (
          <div
            className={`${
              isMenuOpen ? "opacity-1" : "opacity-0"
            } absolute shadow-lg border border-zinc-200 dark:border-zinc-800 transition top-[51px] -left-3 w-[240px] dark:bg-darkColor-800 bg-white rounded-md vazir-medium`}
          >
            <span className="w-[13px] h-[13px] bg-white absolute border-t border-l border-zinc-200 transition dark:border-zinc-800 dark:bg-darkColor-800 rotate-45 top-[-7px] left-6"></span>
            <div className="flex justify-between items-center p-4">
              <div className="flex flex-col gap-2 vazir-regular">
                <span className="dark:text-myText-500 text-myText-600">
                  {userData.data?.displayName || userData.data?.username}
                </span>
                <Link
                  href={`/@${userData.data?.username}`}
                  className="text-myGreen-600"
                >
                  مشاهده پروفایل
                </Link>
              </div>
              <img
                src="/images/avatar-default.jpg"
                className="rounded-full w-[35px] h-[35px]"
              />
            </div>
            <div className="p-4 flex flex-col items-start gap-4 dark:text-myText-400 text-myText-600 border-t border-zinc-200 dark:border-zinc-800">
              <Link href={"/me/settings"}>تنظیمات حساب کاربری</Link>
              <button>پست ها و پیش نویس ها</button>
              <button>مشاهده امار</button>
              <button className="text-myGreen-600">افزایش بازدید</button>
              <button>علاقه مندی ها من</button>
              <button>پست های مورد علاقه</button>
              <Link href={"/me/lists"}>لیست ها</Link>
            </div>
            <div className="p-4 flex flex-col items-start gap-4 dark:text-myText-400 text-myText-600 border-t border-zinc-200 dark:border-zinc-800">
              <button>انتشارات</button>
            </div>
            <button
              onClick={LogOutHandler}
              className="p-4 flex flex-col w-full items-start gap-4 dark:text-myText-400 text-myText-600 border-t border-zinc-200 dark:border-zinc-800"
            >
              خروج
            </button>
            <button
              onClick={ChangeThemeHandler}
              className="p-4 flex w-full items-center justify-between gap-4 dark:text-myText-400 text-myText-600 border-t border-zinc-200 dark:border-zinc-800"
            >
              {userData.theme === "dark" ? (
                <>
                  <span>حالت شب</span>
                  <IoMoonSharp className="text-xl" />
                </>
              ) : (
                <>
                  <span>حالت روز</span>
                  <MdSunny className="text-xl" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
  async function LogOutHandler() {
    const isOk = await ShowSwal(
      "warning",
      "ایا میخاهید از اکانت خود خارج شوید ؟",
      "خیر",
      "بله"
    );
    if (isOk) {
      const res = await axios.get("/api/auth/logout");
      location.reload();
    }
  }
}
