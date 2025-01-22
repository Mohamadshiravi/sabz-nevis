"use client";

import ADSection from "@/components/module/adSection";
import Post from "@/components/module/post";
import TopPosts from "./topPosts";
import SugestionsPeople from "./sugestPeople";
import InfiniteScrollSection from "./infiniteScrollSection";
import { useEffect, useState } from "react";
import PostLoading from "@/components/module/skeletonLoadings/post";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { fetchPostFromServer } from "@/redux/slices/post";

export default function MainSectionPosts() {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    FetchPosts();
  }, []);

  const { loading, data: posts } = useTypedSelector((state) => state.posts);

  async function FetchPosts() {
    await dispatch(fetchPostFromServer());
  }
  return loading ? (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 8 }).map((e, i) => (
        <PostLoading key={i} />
      ))}
    </div>
  ) : (
    <>
      <Post data={posts && posts[0]} />
      <ADSection />
      <Post border data={posts && posts[1]} />
      <Post data={posts && posts[2]} />
      <TopPosts />
      <Post border />
      <Post border />
      <Post />
      <SugestionsPeople />
      <InfiniteScrollSection />
    </>
  );
}
