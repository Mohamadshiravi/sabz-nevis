import { changeTheme, fetchUserDataFromServer } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMoonSharp } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import SabzModal from "../../module/sabzModal";
import LoadingBtn from "../../module/loadingBtn";
import PrimaryBtn from "../../module/primaryBtn";
import { SendErrorToast } from "@/utils/toast-functions";
import Image from "next/image";

export default function HeaderProfileBtn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMount, setIsMenuMount] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const userData = useTypedSelector((state) => {
    return state.user;
  });

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
          <Image
            src={userData.data?.avatar || "/images/avatar-default.jpg"}
            className="rounded-full w-[35px] aspect-square object-cover"
            width={400}
            height={400}
            alt={"user avatar"}
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
                <span className="dark:text-myText-500 text-myText-600">
                  {userData.data?.displayName || userData.data?.username}
                </span>
                <Link
                  href={`/@${userData.data?.username}/profile`}
                  className="text-myGreen-600"
                >
                  مشاهده پروفایل
                </Link>
              </div>
              <Image
                src={userData.data?.avatar || "/images/avatar-default.jpg"}
                className="rounded-full w-[35px] aspect-square object-cover"
                width={400}
                height={400}
                alt={"user avatar"}
              />
            </div>
            <div className="p-4 flex flex-col items-start gap-4 dark:text-myText-400 text-myText-600 border-t border-zinc-200 dark:border-zinc-800">
              <Link href={"/post/create"} className="text-myGreen-600">
                نوشتن پست جدید
              </Link>
              <Link href={"/me/settings"}>تنظیمات حساب کاربری</Link>
              <Link href={"/me/posts"}>پست ها و پیش نویس ها</Link>
              <Link href={"/me/likes"}>پست های لایک شده</Link>
              <Link href={"/me/lists"}>لیست ها</Link>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="p-4 flex flex-col w-full items-start gap-4 dark:text-myText-400 text-myText-600 border-t border-zinc-200 dark:border-zinc-800"
            >
              خروج
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <SabzModal
          CloseModal={() => {
            setIsModalOpen(false);
          }}
        >
          <form onSubmit={LogOutHandler} className="w-full p-6">
            <h3 className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center">
              ایا میخاهید از اکانت خود خارج شوید ؟
            </h3>
            <div className="flex items-center justify-center gap-4 mt-28">
              <LoadingBtn width={"w-[150px]"} loading={false}>
                بله
              </LoadingBtn>
              <PrimaryBtn
                onPress={() => setIsModalOpen(false)}
                width="w-[150px]"
              >
                منصرف شدم
              </PrimaryBtn>
            </div>
          </form>
        </SabzModal>
      )}
    </>
  );
  async function LogOutHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.get("/api/auth/logout");
      location.reload();
    } catch (error) {
      SendErrorToast("مشکلی پیش امد");
    }
  }
}
