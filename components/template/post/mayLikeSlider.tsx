"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import ColPost from "@/components/module/colPost";

export default function MayLikeSlider() {
  return (
    <div className="sm:p-6 p-3 rounded-md mt-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-center gap-4 vazir-medium">
        <h3>شاید ازین پست ها خوشتان بیاید</h3>
      </div>
      <div className="grid mt-6">
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
              <ColPost
                id="2kokfdaoki923"
                cover={"/images/milky-way-mountains-5120x5120-15475.jpg"}
                title={
                  "تأثیر هوش مصنوعی بر زندگی روزمره: فرصت‌ها و تهدیدها تأثیر هوش مصنوعی بر زندگی روزمره: فرصت‌ها و تهدیدها"
                }
                avatar={"/images/photo_2024-12-15_16-52-24.jpg"}
                username={"i_mohamad"}
                readingTime={3}
                displayName={"محمد شیروی"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
