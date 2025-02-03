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
        <h3 className="vazir-medium">حالت شب</h3>
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
    </div>
  );
}
