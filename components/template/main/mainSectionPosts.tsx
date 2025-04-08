"use client";

import Post from "@/components/module/post";
import TopPosts from "./topPosts";
import SugestionsPeople from "./sugestPeople";
import { useEffect } from "react";
import PostLoading from "@/components/module/skeletonLoadings/post";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { fetchPostFromServer } from "@/redux/slices/post";
import ColPostLoading from "@/components/module/skeletonLoadings/colPost";

export default function MainSectionPosts() {
  const dispatch = useTypedDispatch();

  const { loading, data: posts } = useTypedSelector((state) => state.posts);

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPostFromServer());
    }
  }, []);

  return loading ? (
    <div className="grid grid-cols-[1fr] gap-8 w-full">
      <PostLoading />
      <PostLoading />
      <div className="flex w-full overflow-hidden gap-4 px-4 pt-24 pb-4 border border-zinc-200 dark:border-zinc-800 rounded-md">
        {Array.from({ length: 3 }).map((e, i) => (
          <div key={i}>
            <ColPostLoading />
          </div>
        ))}
      </div>
      <PostLoading />
      <PostLoading />
    </div>
  ) : (
    <>
      <Post border data={posts && posts[0]} />
      <Post border data={posts && posts[1]} />
      <TopPosts />
      <Post border data={posts && posts[2]} />
      <Post border data={posts && posts[3]} />
      <SugestionsPeople />
      {posts?.slice(4).map((e) => (
        <Post key={e._id} border data={e} />
      ))}
    </>
  );
}
