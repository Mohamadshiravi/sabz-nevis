"use client";

import { PostModelType } from "@/models/post";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminPanelPosts from "./adminPanelPosts";
import { IoIosSearch } from "react-icons/io";

export default function AllPostsSection() {
  const [posts, setPosts] = useState<[] | PostModelType[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchInp, setSearchInp] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInp !== "") {
        FetchSearchedPosts();
      }
    }, 800);

    if (searchInp === "") {
      FetchAllPosts();
    }

    return () => clearTimeout(timer);
  }, [searchInp]);

  async function FetchAllPosts() {
    setLoading(true);
    try {
      const res = await axios.get("/api/post");
      setPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      SendErrorToast("مشکلی در هنگام دریافت پست ها پیش امد");
      setLoading(false);
    }
  }

  async function FetchSearchedPosts() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/search?type=post&&vord=${searchInp}`);

      setPosts(res.data.data);
      setLoading(false);
    } catch (error) {
      SendErrorToast("مشکلی در هنگام دریافت پست ها پیش امد");
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 sm:p-10 p-0 flex flex-col gap-3">
      <div className="flex items-center gap-3 border-2 text-base vazir-light rounded-md px-3 py-3 border-zinc-200 dark:border-zinc-800">
        <IoIosSearch className="text-2xl text-zinc-500" />
        <input
          onChange={(e) => setSearchInp(e.target.value)}
          value={searchInp}
          placeholder="جستجو در پست ها"
          type="text"
          className="w-full bg-inherit outline-hidden"
        />
      </div>
      {loading ? (
        Array.from({ length: 6 }).map((e, i) => (
          <div
            key={i}
            className="flex flex-col border border-zinc-200 dark:border-zinc-800 p-4 rounded-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-[30px] h-[30px] rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              <div className="w-[120px] h-[25px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
            </div>
            <div className="w-full flex items-center justify-between mt-5">
              <div className="flex flex-col gap-2">
                <h2 className="w-[150px] h-[35px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></h2>
                <div className="w-[180px] h-[20px] bg-zinc-200 dark:bg-zinc-800 animate-pulse mt-3"></div>
                <div className="w-[180px] h-[20px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="md:w-[140px] w-[100px] h-[35px] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-full"></div>
                <div className="md:w-[140px] w-[100px] h-[35px] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        ))
      ) : posts.length === 0 ? (
        <div>پستی موجود نیست</div>
      ) : (
        posts?.map((e, i) => (
          <AdminPanelPosts key={i} data={e} reRenderPosts={FetchAllPosts} />
        ))
      )}
    </div>
  );
}
