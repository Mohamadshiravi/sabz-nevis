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
      <Post border data={posts && posts[0]} />
      <Post border data={posts && posts[1]} />
      <TopPosts />
      <Post border data={posts && posts[2]} />
      <Post border data={posts && posts[3]} />
      <SugestionsPeople />
      {posts?.slice(4).map((e, i) => (
        <Post key={i} border data={e} />
      ))}
    </>
  );
}
