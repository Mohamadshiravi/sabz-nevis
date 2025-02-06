"use client";

import PostHeaderProfileBtn from "@/components/template/createPost/postHeaderProfileBtn";
import PublishModal from "@/components/template/createPost/publishModal";
import { PostModelType } from "@/models/post";
import { fetchUserDataFromServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const SabzTextEditor = dynamic(
  () => import("@/components/template/createPost/sabzTextEditor"),
  {
    loading: () => (
      <div className="mt-10 mb-20 w-full flex flex-col">
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[70px] animate-pulse"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-14"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-2"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-2"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-2"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-2"></div>
      </div>
    ),
    ssr: false,
  }
);

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");

  const [draftLoading, setDraftLoading] = useState(false);
  const [postID, setPostID] = useState("");
  const [imagesUrl, setImagesUrl] = useState<null | ""[]>(null);

  const [savedPost, setSavedPost] = useState<null | PostModelType>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const FetchUserData = async () => {
    await dispatch(fetchUserDataFromServer());
  };

  const dispatch = useTypedDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (body !== "" && body !== savedPost?.body) {
        DraftPostHandler();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [body]);

  useEffect(() => {
    const savedPostId = localStorage.getItem("postId");

    if (!savedPostId) {
      DraftPostHandler();
    } else {
      FetchDraftPost(savedPostId);
      setPostID(savedPostId);
    }

    FetchUserData();
  }, []);

  async function FetchDraftPost(postId: string) {
    try {
      const res = await axios.get(`/api/post/${postId}`);
      setSavedPost(res.data.post);

      setbody(res.data.post.body);
      setTitle(res.data.post.title);
      setImagesUrl(res.data.post.imagesUrl);
    } catch (error) {
      localStorage.removeItem("postId");
      setPostID("");
    }
  }

  return (
    <>
      <header className="flex items-center justify-between py-6 lg:w-[1024px] lg:m-auto w-full lg:px-4 px-2">
        <div className="flex items-center gap-5">
          <Link href={"/home"}>
            <img src="/images/sabz-logo.png" className="w-[45px]" />
          </Link>
          {!draftLoading ? (
            <Link
              href={"/me/posts"}
              className="border sm:block hidden border-myGreen-600 text-myGreen-600 px-2 py-2 text-[11px] rounded-sm hover:text-myGreen-600Hover hover:border-myGreen-600Hover transition"
            >
              رفتن به پیش نویس ها
            </Link>
          ) : (
            <span className="text-zinc-500 sm:block hidden text-sm">
              در حال ذخیره ...
            </span>
          )}
        </div>
        <div className="flex items-center gap-8 pl-3">
          <div className="flex flex-col gap-2 items-center gap-2">
            <button
              onClick={() => {
                title !== ""
                  ? setIsModalOpen(true)
                  : SendErrorToast("لطفا یک عنوان بنویسید");
              }}
              className={`dark:hover:text-zinc-300 hover:text-zinc-500 flex items-center gap-2 text-sm transition bg-zinc-200 dark:bg-zinc-800 px-3 py-2 rounded-md`}
            >
              انتشار نوشته
              <IoIosArrowBack />
            </button>
            {!draftLoading ? (
              <Link
                href={"/me/posts"}
                className="border sm:hidden block border-myGreen-600 text-myGreen-600 px-2 py-2 text-[11px] rounded-sm hover:text-myGreen-600Hover hover:border-myGreen-600Hover transition"
              >
                رفتن به پیش نویس ها
              </Link>
            ) : (
              <span className="text-zinc-500 sm:hidden block text-sm">
                در حال ذخیره ...
              </span>
            )}
          </div>

          <PostHeaderProfileBtn />
        </div>
      </header>
      <main className="lg:w-[1024px] lg:m-auto w-full lg:px-28 px-4">
        <SabzTextEditor
          key={savedPost ? savedPost._id : "initial"}
          savedBody={savedPost?.body || ""}
          savedTitle={savedPost?.title || ""}
          postID={postID}
          setBody={(value: string) => {
            setbody(value);
          }}
          setTitle={(value: string) => {
            setTitle(value);
          }}
        />
      </main>
      {isModalOpen && (
        <PublishModal
          key={savedPost ? savedPost._id : "initial"}
          postId={postID}
          images={imagesUrl}
          CloseModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );

  async function DraftPostHandler() {
    setDraftLoading(true);
    try {
      const res = await axios.post("/api/post/draft", {
        title,
        body,
        postID,
      });

      localStorage.setItem("postId", res.data.id);
      setPostID(res.data.id);
      setImagesUrl(res.data.images);

      setDraftLoading(false);
    } catch (error: any) {
      if (error.response.status === 404 || error.response.status === 403) {
        localStorage.removeItem("postId");
        setPostID("");
      }
      SendErrorToast("پست شما ذخیره نمیشود اتصال خود را بررسی کنید !");
      setDraftLoading(false);
    }
  }
}
