"use client";

import { useTypedSelector } from "@/redux/typedHooks";
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
  return (
    <nav className="z-30 fixed lg:hidden flex bottom-0 border-t border-zinc-200 left-0 w-full bg-white items-center justify-between py-3 px-8 gap-4">
      <button className="w-[30px] h-[30px] overflow-hidden rounded-full">
        <img src="/images/avatar-default.jpg" className="w-full h-full" />
      </button>
      <button>
        <FaHeadphones className="text-xl text-virgoolText-600" />
      </button>
      {!userData ? (
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
      <button>
        <TiHome className="text-2xl  text-virgoolBlue" />
      </button>
    </nav>
  );
}
