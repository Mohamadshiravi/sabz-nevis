"use client";

import PostHeaderProfileBtn from "@/components/template/post/postHeaderProfileBtn";
import { fetchUserDataFromServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const SabzTextEditor = dynamic(
  () => import("@/components/template/post/sabzTextEditor"),
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
  const [loading, setLoading] = useState(false);
  const [postID, setPostID] = useState("");

  const router = useRouter();

  const FetchUserData = async () => {
    await dispatch(fetchUserDataFromServer());
  };

  const dispatch = useTypedDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== "" && body !== "") {
        DraftPostHandler();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [body, title]);

  useEffect(() => {
    FetchUserData();
  }, []);

  return (
    <>
      <header className="flex items-center justify-between py-6 lg:w-[1024px] lg:m-auto w-full lg:px-4 px-2">
        <div className="flex items-center gap-5">
          <Link href={"/home"}>
            <img src="/images/sabz-logo.png" className="w-[45px]" />
          </Link>
          {!draftLoading ? (
            <button className="border sm:block hidden border-myGreen-600 text-myGreen-600 px-2 py-2 text-[11px] rounded-sm hover:text-myGreen-600Hover hover:border-myGreen-600Hover transition">
              رفتن به پیش نویس ها
            </button>
          ) : (
            <span className="text-zinc-500 sm:block hidden text-sm">
              در حال ذخیره ...
            </span>
          )}
        </div>
        <div className="flex items-center gap-8 pl-3">
          <div className="flex flex-col gap-2 items-center gap-2">
            <button
              onClick={PublishPostHandler}
              disabled={loading}
              className={`${
                loading
                  ? "cursor-not-allowed text-zinc-500"
                  : "dark:hover:text-zinc-300 hover:text-zinc-500"
              } flex items-center gap-2 text-sm transition bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-md`}
            >
              {loading ? "در حال انتشار ..." : "انتشار نوشته"}
              {!loading && <IoIosArrowBack />}
            </button>
            {!draftLoading ? (
              <button className="border sm:hidden block border-myGreen-600 text-myGreen-600 px-2 py-2 text-[11px] rounded-sm hover:text-myGreen-600Hover hover:border-myGreen-600Hover transition">
                رفتن به پیش نویس ها
              </button>
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
          postID={postID}
          setBody={(value: string) => {
            setbody(value);
          }}
          setTitle={(value: string) => {
            setTitle(value);
          }}
        />
      </main>
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

      setPostID(res.data.id);

      setDraftLoading(false);
    } catch (error) {
      SendErrorToast("پست شما ذخیره نمیشود اتصال خود را بررسی کنید !");
      setDraftLoading(false);
    }
  }
  async function PublishPostHandler() {
    if (title !== "") {
      setLoading(true);
      try {
        const res = await axios.post("/api/post/publish", {
          postID,
        });
        SendSucToast("پست با موفقیت منتشر شد");
        router.push("/home");
        setLoading(false);
      } catch (error) {
        SendErrorToast("پست شما انتشار نیافت اتصال خود را بررسی کنید !");
        setLoading(false);
      }
    } else {
      SendErrorToast("لطفا یک عنوان بنویسید");
    }
  }
}
