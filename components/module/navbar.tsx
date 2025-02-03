"use client";

import { useTypedSelector } from "@/redux/typedHooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { FaHeadphones } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { RiApps2Fill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";

export default function MobileNavbar() {
  const userData = useTypedSelector((state) => {
    return state.user;
  });

  const regex = /^\/me\/settings(\/.*)?$/;

  const path = usePathname();
  return (
    <nav className="z-40 fixed lg:hidden flex bottom-0 border-t border-zinc-200 left-0 w-full bg-white dark:bg-darkColor-800 dark:border-zinc-800 items-center justify-between py-3 px-8 gap-4">
      <Link
        href={
          userData.data?.username
            ? `/@${userData.data?.username}/profile`
            : `/login`
        }
        className={`${
          path === `/@${userData.data?.username}/profile` ||
          path === `/@${userData.data?.username}/profile/lists`
            ? "border-2 border-myGreen-600"
            : "border border-zinc-200"
        } w-[32px] h-[32px] rounded-full overflow-hidden`}
      >
        <Image
          width={400}
          height={400}
          alt={"user avatar"}
          src={userData.data?.avatar || "/images/guest-avatar.webp"}
          className="w-full h-full rounded-full object-cover"
        />
      </Link>
      <Link
        href={"/me/settings"}
        className={`${
          regex.test(path) ? "text-myGreen-600" : "text-myText-600"
        }`}
      >
        <FiSettings className="text-2xl transition" />
      </Link>
      {!userData.data ? (
        <button>
          <RiApps2Fill className="text-xl text-myText-600" />
        </button>
      ) : (
        <Link
          href={"/post/create"}
          className="bg-myGreen-600 px-5 py-1 rounded-full"
        >
          <AiOutlinePlus className="text-2xl text-white" />
        </Link>
      )}
      <button>
        <IoSearch className="text-xl text-myText-600" />
      </button>
      <Link
        href={"/home"}
        className={`${
          path === "/home" ? "text-myGreen-600" : "text-myText-600"
        }`}
      >
        <TiHome className="text-2xl transition" />
      </Link>
    </nav>
  );
}
