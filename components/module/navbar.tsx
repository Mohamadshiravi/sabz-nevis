"use client";

import { useTypedSelector } from "@/redux/typedHooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { FaHeadphones } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiApps2Fill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";

export default function MobileNavbar() {
  const userData = useTypedSelector((state) => {
    return state.user;
  });

  const path = usePathname();
  return (
    <nav className="z-30 fixed lg:hidden flex bottom-0 border-t border-zinc-200 left-0 w-full bg-white items-center justify-between py-3 px-8 gap-4">
      <Link
        href={"/me/settings"}
        className={`w-[32px] h-[32px] rounded-full overflow-hidden`}
      >
        <img src="/images/avatar-default.jpg" className="w-full h-full" />
      </Link>
      <Link
        href={"/podcasts"}
        className={`${
          path === "/podcasts" ? "text-virgoolBlue" : "text-virgoolText-600"
        }`}
      >
        <FaHeadphones className="text-2xl transition" />
      </Link>
      {!userData.data ? (
        <button>
          <RiApps2Fill className="text-xl text-virgoolText-600" />
        </button>
      ) : (
        <button className="bg-virgoolBlue px-5 py-1 rounded-full">
          <AiOutlinePlus className="text-2xl text-white" />
        </button>
      )}
      <button>
        <IoSearch className="text-xl text-virgoolText-600" />
      </button>
      <Link
        href={"/"}
        className={`${
          path === "/" ? "text-virgoolBlue" : "text-virgoolText-600"
        }`}
      >
        <TiHome className="text-2xl transition" />
      </Link>
    </nav>
  );
}
