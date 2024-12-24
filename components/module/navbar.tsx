"use client";

import { usePathname } from "next/navigation";
import { FaHeadphones, FaHome } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiApps2Fill } from "react-icons/ri";

export default function MobileNavbar() {
  const path = usePathname();
  const invalidUrl = /^\/(login|register)$/;
  return (
    !invalidUrl.test(path) && (
      <nav className="z-30 fixed lg:hidden flex bottom-0 border-t border-zinc-200 left-0 w-full bg-white items-center justify-between py-3 px-8 gap-4">
        <button className="w-[30px] h-[30px] overflow-hidden rounded-full">
          <img src="/images/avatar-default.jpg" className="w-full h-full" />
        </button>
        <button>
          <FaHeadphones className="text-xl text-virgoolText-600" />
        </button>
        <button>
          <RiApps2Fill className="text-xl text-virgoolText-600" />
        </button>
        <button>
          <IoSearch className="text-xl text-virgoolText-600" />
        </button>
        <button>
          <FaHome className="text-xl  text-virgoolBlue" />
        </button>
      </nav>
    )
  );
}
