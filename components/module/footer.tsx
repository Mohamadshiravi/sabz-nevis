"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoPaperclip } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { useTypedSelector } from "@/redux/typedHooks";
import axios from "axios";
import { CategoryModelType } from "@/models/category";
import Link from "next/link";

export default function Footer({ isSimple }: { isSimple?: boolean }) {
  const [categorys, setCategorys] = useState<[] | CategoryModelType[]>([]);
  const [loading, setLoading] = useState(true);
  const userData = useTypedSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    FetchCategorys();
  }, []);

  async function FetchCategorys() {
    setLoading(true);
    try {
      const res = await axios.get("/api/category");
      setCategorys(res.data.categories.slice(0, 8));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <footer
      className={`w-full sm:pt-14 py-4 lg:flex hidden flex-col gap-4 ${
        userData.data ? "lg:px-6" : "lg:px-8 px-0"
      } lg:border-r border-zinc-200 dark:border-zinc-800`}
    >
      <section className="flex flex-col gap-4 sticky top-20">
        {!userData.data && !isSimple && !loading && (
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-md grid grid-cols-[6fr_6fr] py-4">
            <div className="flex items-center justify-center">
              <Image
                src={"/images/logo.png"}
                width={600}
                height={600}
                alt="samandehi"
                className="w-[80px]"
              />
            </div>
            <div className="flex items-center justify-center border-r border-zinc-200 dark:border-zinc-800">
              <Image
                src={"/images/logo2.png"}
                width={600}
                height={600}
                alt="enamad"
                className="w-[80px]"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="bg-zinc-200 dark:bg-darkColor-700 p-2 rounded-full text-xl text-zinc-400">
              <GoPaperclip />
            </span>
            <p className="vazir-bold text-sm">موضوعات پیشنهادی</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {loading
              ? Array.from({ length: 8 }).map((e, i) => (
                  <span
                    key={i}
                    className="bg-zinc-200 rounded-md dark:bg-zinc-800 animate-pulse w-[70px] h-[25px]"
                  ></span>
                ))
              : categorys.map((e, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-md transition cursor-pointer text-center text-myText-800 dark:text-myText-500 border border-myText-800 dark:border-myText-500"
                  >
                    {e.name}
                  </span>
                ))}
          </div>
          <Link
            href={"/searchbar"}
            className="flex gap-2 items-center text-myGreen-600 text-xs self-end mt-2"
          >
            مشاهده موضوعات بیشتر
            <IoIosArrowBack className="text-sm" />
          </Link>
        </div>
      </section>
    </footer>
  );
}
