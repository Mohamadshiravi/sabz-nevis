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
import User from "@/components/module/user";

export default function SugestionsPeople() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<
    | []
    | {
        username: string;
        avatar: string;
        displayName: string;
        _id: string;
        followers: string[];
      }[]
  >([]);

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
              <User
                followers={e.followers}
                id={e._id}
                username={e.username}
                displayName={e.displayName}
                avatar={e.avatar}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
