"use client";

import { FaMicrophone } from "react-icons/fa";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { MdPlayArrow } from "react-icons/md";

export default function PodcastSection() {
  const [podcasts, setPodcats] = useState([
    {
      name: "پادکست رفتار",
      src: "/podcasts/9914925a-3298-4ab3-a70a-251f481ddf1a.webp",
    },
    { name: "اینده نزدیک", src: "/podcasts/7rlj3f.webp" },
    {
      name: "سطر نشین",
      src: "/podcasts/34d7d782-8d73-4009-a5ec-738b657f236e.webp",
    },
    {
      name: "راز های کسب و کار",
      src: "/podcasts/business.webp",
    },
    { name: "ارامش ذهن", src: "/podcasts/psychology.webp" },
    { name: "شاهنامه خوانی", src: "/podcasts/shahnameh.webp" },
  ]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="bg-zinc-100 p-2 rounded-full text-xl text-zinc-400">
          <FaMicrophone />
        </span>
        <p className="vazir-bold text-sm">پست‌های صوتی انتخابی برای شما</p>
      </div>
      <div className="grid">
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          className="w-full h-[120px]"
        >
          {podcasts.map((e, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-md overflow-hidden relative w-full h-full text-white">
                <Image
                  src={e.src}
                  width={600}
                  height={600}
                  alt={e.name}
                  className="w-[120px]"
                />
                <div className="w-full h-full bg-gradient-to-b from-black/0 to-black/70 z-[1] absolute top-0 left-0"></div>
                <span className="absolute bottom-3 right-2 z-[2] vazir-bold text-sm">
                  {e.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between border-b border-zinc-200 mt-3 py-3">
          <span className="vazir-bold">پادکست رفتار</span>
          <button className="flex gap-2 items-center text-virgoolBlue text-xs">
            مشاهده همه قسمت‌ها
            <IoIosArrowBack className="text-sm" />
          </button>
        </div>
        <div className="flex flex-col gap-3 py-3">
          {Array.from({ length: 4 }).map((e, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex gap-2">
                <Image
                  src={"/podcasts/psychology.webp"}
                  width={100}
                  height={100}
                  alt="podcast"
                  className="w-[45px] h-[45px] object-cover rounded-sm"
                />
                <div className="flex flex-col justify-between py-1">
                  <span className="text-xs vazir-bold">
                    اپیزود هشتم : تلقین
                  </span>
                  <span className="text-[10px] text-zinc-500">44 : 54</span>
                </div>
              </div>
              <button className="bg-virgoolBlue p-1 rounded-full text-white text-2xl">
                <MdPlayArrow />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
