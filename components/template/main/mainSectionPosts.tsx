"use client";

import ADSection from "@/components/module/adSection";
import Post from "@/components/module/post";
import TopPosts from "./topPosts";
import SugestionsPeople from "./sugestPeople";
import InfiniteScrollSection from "./infiniteScrollSection";
import { useEffect, useState } from "react";
import PostLoading from "@/components/module/skeletonLoadings/post";

export default function MainSectionPosts() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 8 }).map((e, i) => (
        <PostLoading />
      ))}
    </div>
  ) : (
    <>
      <Post />
      <ADSection />
      <Post border />
      <Post />
      <TopPosts />
      <Post border />
      <Post border />
      <Post />
      <SugestionsPeople />
      <InfiniteScrollSection />
    </>
  );
}
