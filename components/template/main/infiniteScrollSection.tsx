"use client";

import Post from "@/components/module/post";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function InfiniteScrollSection() {
  const [posts, setPosts] = useState<{}[]>([]);
  const { ref, inView } = useInView();

  async function fetchPosts() {
    const res = [{}, {}, {}, {}, {}];
    const newPosts = [...posts, ...res];
    setPosts(newPosts);
  }

  useEffect(() => {
    if (inView) {
      fetchPosts();
    }
  }, [inView]);

  return (
    <div className="flex flex-col gap-8">
      {posts.map((e, i) => (
        <Post key={i} border />
      ))}
      <div ref={ref} className="h-1"></div>
    </div>
  );
}
