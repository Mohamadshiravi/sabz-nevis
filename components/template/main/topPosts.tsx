"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export default function TopPosts() {
  return (
    <div className="bg-emerald-600 sm:p-6 p-3 rounded-md">
      <div className="flex items-center gap-4 text-white vazir-bold">
        <div className="bg-white p-2 rounded-md shadow-lg">
          <img src="/images/sabz-logo.png" className="w-[30px]" />
        </div>
        <h3>پست های منتخب</h3>
      </div>
      <div className="grid mt-8">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2.3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3.1,
              spaceBetween: 20,
            },
          }}
          slidesPerView={1.3}
          spaceBetween={20}
          className="w-full h-[340px]"
        >
          {Array.from({ length: 8 }).map((e, i) => (
            <SwiperSlide key={i}>
              <div className="w-full h-full bg-white dark:bg-darkColor-800 rounded-md overflow-hidden flex flex-col">
                <Image
                  src={"/images/milky-way-mountains-5120x5120-15475.jpg"}
                  width={800}
                  height={800}
                  alt="test"
                  className="h-[190px] object-cover"
                />
                <div className="p-4 flex flex-col">
                  <h4 className="twoLineText text-myText-600 text-sm vazir-bold">
                    تأثیر هوش مصنوعی بر زندگی روزمره: فرصت‌ها و تهدیدها تأثیر
                    هوش مصنوعی بر زندگی روزمره: فرصت‌ها و تهدیدها
                  </h4>
                  <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                      <Image
                        src={"/images/photo_2024-12-15_16-52-24.jpg"}
                        width={100}
                        height={100}
                        alt="test"
                        className="w-[20px] object-cover rounded-full"
                      />
                      <span className="text-xs block w-full truncate">
                        i_mohamad
                      </span>
                    </div>
                    <span className="text-xs text-myText-600">
                      خواندن ۳ دقیقه
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
