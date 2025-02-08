"use client";

import { fetchLikedPosts } from "@/redux/slices/likedPost";
import { fetchListsFromServer } from "@/redux/slices/list";
import { fetchPostFromServer, toggleLikePost } from "@/redux/slices/post";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast } from "@/utils/toast-functions";
import { useEffect, useState } from "react";
import {
  GoBookmark,
  GoBookmarkFill,
  GoComment,
  GoHeart,
  GoHeartFill,
} from "react-icons/go";
import SavePostDropDown from "../postModule/savePostDropdown";
import axios from "axios";
import { PostModelType } from "@/models/post";

export default function PostEvents({ postId }: { postId: string }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<null | PostModelType>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: lists, loading: listLoading } = useTypedSelector(
    (state) => state.lists
  );
  const userId = useTypedSelector((state) => state.user).data?._id;

  useEffect(() => {
    if (!post) {
      FetchCurrentPost();
    }
    if (!lists) {
      dispatch(fetchListsFromServer());
    }
    setLoading(false);
  }, []);

  const dispatch = useTypedDispatch();

  async function FetchCurrentPost() {
    try {
      const res = await axios.get(`/api/post/${postId}?filter=simple`);
      setPost(res.data.post);
    } catch (error) {}
  }

  return loading || listLoading ? (
    <div className="flex items-center gap-6">
      <div className="w-[30px] h-[30px] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
      <div className="w-[30px] h-[30px] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
      <div className="w-[30px] h-[30px] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
    </div>
  ) : (
    <div className="flex items-center gap-6 text-xl text-myText-600">
      {post?.likes.some((e) => e === userId) ? (
        <button
          onClick={ToggleLikePostHandler}
          className="flex items-center gap-2"
        >
          <GoHeartFill className="text-red-600 transition" />
          <span className="text-lg">{post?.likes.length}</span>
        </button>
      ) : (
        <button className="flex items-center gap-2">
          <GoHeart
            onClick={ToggleLikePostHandler}
            className="hover:text-red-600 transition"
          />
          <span className="text-lg">{post?.likes.length}</span>
        </button>
      )}
      <button
        onClick={() => {
          document.querySelector("#commentSection")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-2"
      >
        <GoComment className="hover:text-zinc-800 transition" />
        <span className="text-lg">{post?.comments.length}</span>
      </button>
      <div className="relative">
        {lists?.some((list) =>
          list.posts.some((post) => post._id === post?._id)
        ) ? (
          <GoBookmarkFill
            onClick={() => setIsDropdownOpen(true)}
            className="hover:text-blue-600 transition cursor-pointer"
          />
        ) : (
          <GoBookmark
            onClick={() => setIsDropdownOpen(true)}
            className="hover:text-blue-600 transition cursor-pointer"
          />
        )}

        {isDropdownOpen && (
          <SavePostDropDown
            postId={post?._id || null}
            Close={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    </div>
  );
  async function ToggleLikePostHandler() {
    if (userId) {
      if (!loading && post) {
        setLoading(true);
        const res = await dispatch(toggleLikePost(post?._id));
        if (res.payload) {
          setLoading(false);
          FetchCurrentPost();
          dispatch(fetchPostFromServer());
          dispatch(fetchLikedPosts());
        } else {
          setLoading(false);
          SendErrorToast("اتصال خود را بررسی کنید");
        }
      }
    } else {
      SendErrorToast("ابتدا وارد اکانت خود شوید");
    }
  }
}
