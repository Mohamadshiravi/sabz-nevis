"use client";

import ProfilePost from "@/components/module/profilePost";
import { PostModelType } from "@/models/post";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DraftPosts() {
  const [posts, setPosts] = useState<[] | PostModelType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchDraftPosts();
  }, []);

  async function FetchDraftPosts() {
    setLoading(true);
    try {
      const res = await axios.get("/api/post/draft");
      setPosts(res.data.draftPosts);
      setLoading(false);
    } catch (error) {
      SendErrorToast("مشکلی در هنگام دریافت پست ها پیش امد");
      setLoading(false);
    }
  }
  return (
    <div className="mt-4">
      {loading ? (
        Array.from({ length: 6 }).map((e, i) => (
          <div
            key={i}
            className="w-full flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 py-6"
          >
            <div className="flex flex-col gap-6">
              <h2 className="w-[150px] h-[50px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></h2>
              <div className="w-[180px] h-[20px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="md:w-[140px] w-[100px] h-[35px] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-full"></div>
              <div className="md:w-[140px] w-[100px] h-[35px] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-full"></div>
            </div>
          </div>
        ))
      ) : posts.length === 0 ? (
        <div>پستی موجود نیست</div>
      ) : (
        posts?.map((e, i) => (
          <ProfilePost key={i} data={e} reRenderPosts={FetchDraftPosts} />
        ))
      )}
    </div>
  );
}
