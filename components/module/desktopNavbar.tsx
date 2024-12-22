"use client";
import Image from "next/image";
import { useState } from "react";
import PodcastSection from "../template/main/podcastSection";
import { GoPaperclip } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

export default function DesktopNavbar() {
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
  return (
    <section className="w-full pt-14 flex flex-col gap-4 px-8 border-r border-zinc-200">
      <Image
        src={"/images/virgool_business_cta.webp"}
        width={800}
        height={800}
        alt="busines banner"
        className="rounded-lg"
      />
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
      <div className="flex flex-col gap-4 sticky top-4">
        <PodcastSection />
        <div className="flex items-center gap-4">
          <span className="bg-zinc-100 p-2 rounded-full text-xl text-zinc-400">
            <GoPaperclip />
          </span>
          <p className="vazir-bold text-sm">موضوعات پیشنهادی</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categorys.map((e, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-md transition cursor-pointer text-center text-virgoolText-800 border border-virgoolText-800"
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
    </section>
  );
}
