"use client";

import VirgoolTextEditor from "@/components/module/virgoolTextEditor";
import PostHeaderProfileBtn from "@/components/template/post/postHeaderProfileBtn";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default function CreatePostPage() {
  return (
    <>
      <header className="flex items-center justify-between py-6 lg:w-[1024px] lg:m-auto w-full lg:px-4 px-2">
        <div className="flex items-center gap-3">
          <Link href={"/home"}>
            <img src="/images/logo.webp" className="w-[50px]" />
          </Link>
          <button className="border sm:block hidden border-virgoolBlue text-virgoolBlue px-2 py-2 text-[11px] rounded-sm hover:text-virgoolBlueHover hover:border-virgoolBlueHover transition">
            رفتن به پیش نویس ها
          </button>
        </div>
        <div className="flex items-center gap-8 pl-3">
          <div className="flex items-center gap-2">
            <button>
              <CiSettings className="text-2xl dark:text-zinc-400" />
            </button>
            <button className="flex items-center gap-2 text-sm dark:hover:text-zinc-300 transition">
              انتشار نوشته
              <IoIosArrowBack />
            </button>
          </div>
          <PostHeaderProfileBtn />
        </div>
      </header>
      <main className="lg:w-[1024px] lg:m-auto w-full lg:px-28 px-4">
        <VirgoolTextEditor />
      </main>
    </>
  );
}
