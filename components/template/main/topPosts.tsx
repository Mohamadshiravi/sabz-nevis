"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import ColPost from "@/components/module/colPost";
import { useEffect, useState } from "react";
import { PostModelType } from "@/models/post";
import axios from "axios";
import ColPostLoading from "@/components/module/skeletonLoadings/colPost";

export default function TopPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<[] | PostModelType[]>([]);

  useEffect(() => {
    FetchTopPost();
  }, []);
  async function FetchTopPost() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/post/filter?filter=top`);

      setPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <div className="bg-emerald-600 sm:p-6 p-3 rounded-md">
      <div className="flex items-center gap-4 text-white vazir-bold">
        <div className="bg-white p-2 rounded-md shadow-lg">
          <img src="/images/sabz-logo.png" className="w-[30px]" />
        </div>
        <h3>پست های منتخب</h3>
      </div>
      <div className="grid mt-8">
        {loading ? (
          <div className="flex w-full overflow-hidden gap-4">
            {Array.from({ length: 4 }).map((e, i) => (
              <div key={i}>
                <ColPostLoading />
              </div>
            ))}
          </div>
        ) : (
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
            {posts.map((e, i) => (
              <SwiperSlide key={i}>
                <ColPost
                  id={e._id}
                  cover={e.cover}
                  title={e.title}
                  avatar={e.user.avatar}
                  username={e.user.username}
                  readingTime={e.readingTime}
                  displayName={e.user.displayName || e.user.username}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
