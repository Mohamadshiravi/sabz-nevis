import { changeTheme } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import ShowSwal from "@/utils/modalFunctions";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMoonSharp } from "react-icons/io5";
import { MdSunny } from "react-icons/md";

export default function HeaderProfileBtn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMount, setIsMenuMount] = useState(false);

  const userData = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

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
      <div className="relative h-[40px] z-[40]">
        <button
          onClick={AnimateToggleModal}
          className="flex items-center bg-zinc-100 cursor-pointer dark:bg-darkColor-700 h-full py-1 pl-0.5 gap-2 rounded-full"
        >
          <IoIosArrowDown className="mr-3 text-xs" />
          <img
            src="/images/avatar-default.jpg"
            className="rounded-full w-[35px] aspect-square"
          />
        </button>
        {isMenuMount && (
          <div
            className={`${
              isMenuOpen ? "opacity-1" : "opacity-0"
            } absolute shadow-lg border border-zinc-200 dark:border-zinc-800 transition top-[51px] left-0 w-[240px] dark:bg-darkColor-800 bg-white rounded-md vazir-medium`}
          >
            <span className="w-[13px] h-[13px] bg-white absolute border-t border-l border-zinc-200 transition dark:border-zinc-800 dark:bg-darkColor-800 rotate-45 top-[-7px] left-6"></span>
            <div className="flex justify-between items-center p-4">
              <div className="flex flex-col gap-2 vazir-regular">
                <span className="dark:text-virgoolText-500 text-virgoolText-600">
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
            <div className="p-4 flex flex-col items-start gap-4 dark:text-virgoolText-400 text-virgoolText-600 border-t border-zinc-200 dark:border-zinc-800">
              <Link href={"/post/create"} className="text-myGreen-600">
                نوشتن پست جدید
              </Link>
              <Link href={"/me/settings"}>تنظیمات حساب کاربری</Link>
              <button>پست ها و پیش نویس ها</button>
              <button>مشاهده امار</button>
              <button>موضوع های مورد علاقه</button>
              <button>پست های لایک شده</button>
              <Link href={"/me/lists"}>لیست ها</Link>
            </div>

            <button
              onClick={LogOutHandler}
              className="p-4 flex flex-col w-full items-start gap-4 dark:text-virgoolText-400 text-virgoolText-600 border-t border-zinc-200 dark:border-zinc-800"
            >
              خروج
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
