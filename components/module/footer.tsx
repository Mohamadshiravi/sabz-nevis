"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import PodcastSection from "../template/main/podcastSection";
import { GoPaperclip } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { useTypedSelector } from "@/redux/typedHooks";

export default function Footer({ isSimple }: { isSimple?: boolean }) {
  const [ads, setAds] = useState([
    "بلیط هواپیما",
    "بازار خرید تتر",
    "خرید فالوور واقعی",
    "خرید سرور اچ پی",
    "قیمت لحظه ای اتریوم",
    "خرید یوسی",
    "ویزای تجاری",
    "VPS",
  ]);
  const [categorys, setCategorys] = useState([
    "شغل و کار",
    "موسیقی",
    "خودشناسی",
    "فیلم سینمایی",
    "شغل و کار",
    "موسیقی",
    "خودشناسی",
    "فیلم سینمایی",
  ]);
  const [loading, setLoading] = useState(true);
  const userData = useTypedSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <footer
      className={`w-full sm:pt-14 py-4 lg:flex hidden flex-col gap-4 ${
        userData.data ? "lg:px-6" : "lg:px-8 px-0"
      } lg:border-r border-zinc-200 dark:border-zinc-800`}
    >
      <Image
        src={"/images/virgool_business_cta.webp"}
        width={800}
        height={800}
        alt="busines banner"
        className="rounded-lg"
      />
      {!loading && !userData.data && !isSimple && (
        <>
          <div className="flex flex-wrap gap-2">
            {ads.map((e, i) => (
              <span
                key={i}
                className="bg-zinc-50 text-[10px] p-2 hover:bg-zinc-200 transition cursor-pointer rounded-sm  text-center text-virgoolText-600"
              >
                {e}
              </span>
            ))}
          </div>
          <div className="border border-zinc-200 rounded-md grid grid-cols-[6fr_6fr] py-4">
            <div className="flex items-center justify-center">
              <Image
                src={"/images/logo.png"}
                width={600}
                height={600}
                alt="samandehi"
                className="w-[80px]"
              />
            </div>
            <div className="flex items-center justify-center border-r border-zinc-200">
              <Image
                src={"/images/logo2.png"}
                width={600}
                height={600}
                alt="enamad"
                className="w-[80px]"
              />
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col gap-4 sticky top-4">
        {!isSimple && <PodcastSection />}
        <div className="flex items-center gap-4">
          <span className="bg-zinc-100 dark:bg-darkColor-700 p-2 rounded-full text-xl text-zinc-400">
            <GoPaperclip />
          </span>
          <p className="vazir-bold text-sm">موضوعات پیشنهادی</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categorys.map((e, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-md transition cursor-pointer text-center text-virgoolText-800 dark:text-virgoolText-500 border border-virgoolText-800 dark:border-virgoolText-500"
            >
              {e}
            </span>
          ))}
        </div>
        <button className="flex gap-2 items-center text-virgoolBlue text-xs self-end mt-2">
          مشاهده موضوعات بیشتر
          <IoIosArrowBack className="text-sm" />
        </button>
      </div>
    </footer>
  );
}
