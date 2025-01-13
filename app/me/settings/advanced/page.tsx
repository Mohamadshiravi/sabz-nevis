"use client";

import { changeTheme } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { IoMoonSharp } from "react-icons/io5";
import { MdOutlineAccessTime, MdSunny } from "react-icons/md";

export default function SettingsAdvanced() {
  const dispatch = useTypedDispatch();

  const userData = useTypedSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-10 pt-10 lg:pb-10 pb-20">
      <div className="flex sm:flex-row flex-col gap-3 items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-medium">حالت شب</h3>
          <h4 className="text-myText-600 text-sm pl-2">
            حالت خودکار از ساعت ۰۰:۰۰ تا ۶:۰۰ فعال می‌شود.
          </h4>
        </div>
        <div className="flex items-center border border-zinc-400 dark:border-zinc-700 text-xl rounded-full overflow-hidden">
          <button
            onClick={() => {
              dispatch(changeTheme("dark"));
            }}
            className={`px-4 py-2 ${
              userData.theme !== "dark"
                ? "border-l border-zinc-400 dark:border-zinc-700"
                : "bg-myGreen-600 text-white"
            }`}
          >
            <IoMoonSharp />
          </button>
          <button className="px-4 py-2">
            <MdOutlineAccessTime />
          </button>
          <button
            onClick={() => {
              dispatch(changeTheme("light"));
            }}
            className={`px-4 py-2 ${
              userData.theme === "dark"
                ? "border-r border-zinc-400 dark:border-zinc-700"
                : "bg-myGreen-600 text-white"
            }`}
          >
            <MdSunny />
          </button>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-3 items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h4 className="text-myText-600 text-sm pl-2">
            نمایش دکمه خاموش/روشن در منوی پروفایل کاربری
          </h4>
        </div>
        <div className="flex items-center border border-zinc-400 dark:border-zinc-700 text-sm rounded-full vazir-medium overflow-hidden">
          <button className="px-4 py-2 border-l border-zinc-400 dark:border-zinc-700">
            خیر
          </button>
          <button className="px-4 py-2 border-r border-zinc-400 dark:border-zinc-700 bg-myGreen-600 text-white">
            بله
          </button>
        </div>
      </div>
    </div>
  );
}
