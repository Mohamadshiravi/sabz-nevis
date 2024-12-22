"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

export default function SugestionsPeople() {
  return (
    <div>
      <div className="flex items-center gap-3 vazir-bold">
        <IoPerson className="text-3xl" />
        <h3>افرادی که شاید بشناسید</h3>
      </div>
      <div className="grid mt-6">
        <Swiper
          slidesPerView={3.5}
          spaceBetween={20}
          className="w-full h-[270px]"
        >
          {Array.from({ length: 8 }).map((e, i) => (
            <SwiperSlide key={i}>
              <div className="border p-4 border-zinc-200 w-full h-full justify-between bg-white rounded-md flex flex-col items-center">
                <div className="flex flex-col items-center gap-3 w-full">
                  <Image
                    src={"/images/milky-way-mountains-5120x5120-15475.jpg"}
                    width={500}
                    height={500}
                    alt="test"
                    className="w-[90px] object-cover rounded-full"
                  />

                  <h4 className="text-virgoolText-600 text-sm w-full text-center truncate w-full">
                    i_mohamad_85
                  </h4>
                  <h3 className="vazir-bold text-lg mt-2 w-full truncate text-center">
                    محمد شیروی
                  </h3>
                </div>
                <button className="flex w-full text-nowrap text-sm items-center justify-center gap-4 bg-virgoolBlue hover:bg-virgoolBlueHover transition rounded-full pr-5 pl-3 py-2 text-white vazir-bold">
                  دنبال کنید
                  <FiPlus className="text-lg" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
