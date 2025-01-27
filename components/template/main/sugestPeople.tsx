"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { PostModelType } from "@/models/post";
import axios from "axios";
import { UserModelType } from "@/models/user";
import Link from "next/link";

export default function SugestionsPeople() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<[] | UserModelType[]>([]);

  useEffect(() => {
    FetchUsers();
  }, []);

  async function FetchUsers() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/users`);

      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 vazir-bold">
        <IoPerson className="text-3xl" />
        <h3>افرادی که شاید بشناسید</h3>
      </div>
      <div className="grid mt-6">
        <Swiper
          breakpoints={{
            600: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
          }}
          slidesPerView={1.5}
          spaceBetween={20}
          className="w-full h-[270px]"
        >
          {users.map((e, i) => (
            <SwiperSlide key={i}>
              <div className="border dark:bg-darkColor-800 dark:border-zinc-800 p-4 border-zinc-200 w-full h-full justify-between bg-white rounded-md flex flex-col items-center">
                <div className="flex flex-col items-center gap-3 w-full">
                  <Image
                    src={e.avatar}
                    width={500}
                    height={500}
                    alt="test"
                    className="w-[90px] h-[90px] object-cover rounded-full"
                  />

                  <Link
                    href={`/@${e.username}/profile`}
                    className="text-myText-600 text-sm w-full text-center truncate w-full"
                  >
                    {e.username}
                  </Link>
                  <Link
                    href={`/@${e.username}/profile`}
                    className="vazir-bold text-lg mt-2 w-full truncate text-center"
                  >
                    {e.displayName}
                  </Link>
                </div>
                <button className="flex w-full text-nowrap text-sm items-center justify-center gap-4 bg-myGreen-600 hover:bg-myGreen-700 transition rounded-full pr-5 pl-3 py-2 text-white vazir-bold">
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
