"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ColPost from "@/components/module/colPost";
import axios from "axios";
import { useEffect, useState } from "react";
import ColPostLoading from "@/components/module/skeletonLoadings/colPost";
import { PostModelType } from "@/models/post";

export default function MayLikeSlider({
  category,
  current,
}: {
  category: string;
  current: string;
}) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<[] | PostModelType[]>([]);

  useEffect(() => {
    FetchMightlikePost();
  }, []);
  async function FetchMightlikePost() {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/post?filter=mightLike&category=${category}`
      );

      const filteredPosts = res.data.posts.filter(
        (e: PostModelType) => e._id !== current
      );

      console.log(filteredPosts);

      setPosts(filteredPosts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <div className="sm:p-6 p-3 rounded-md mt-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-center gap-4 vazir-medium">
        <h3>شاید ازین پست ها خوشتان بیاید</h3>
      </div>
      <div className="grid mt-6">
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
                  bordered
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
