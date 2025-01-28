"use client";

import Post from "@/components/module/post";
import PostLoading from "@/components/module/skeletonLoadings/post";
import { fetchLikedPosts } from "@/redux/slices/likedPost";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { useEffect } from "react";

export default function LikedPostMainSection() {
  const { loading, data } = useTypedSelector((state) => state.likedPosts);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchLikedPosts());
  }, []);

  return (
    <section className="pt-14 pb-20">
      <div className="flex items-center sm:flex-row flex-col sm:gap-0 gap-4 justify-between w-full mt-8">
        <h1 className="vazir-bold text-4xl">پست های لایک شده</h1>
      </div>
      <div className="flex flex-col gap-10 mt-16 sm:px-8 px-0 w-full">
        {!loading ? (
          data?.length !== 0 ? (
            data?.map((e, i) => <Post isLikedPost border data={e} key={i} />)
          ) : (
            <div>شما هیج پستی را لایک نکرده اید</div>
          )
        ) : (
          Array.from({ length: 6 }).map((e, i) => <PostLoading key={i} />)
        )}
      </div>
    </section>
  );
}
