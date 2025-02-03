"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import { CommentModelType } from "@/models/comment";
import { AddCommentToPost } from "@/redux/slices/post";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import CommentReply from "./commentReply";

export default function Comment({ data }: { data: CommentModelType }) {
  const {
    _id: userId,
    username,
    avatar,
  } = useTypedSelector((state) => state.user).data || {};

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [commentLikeLength, setCommentLikeLength] = useState(0);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (data.likes.some((e) => e.toString() === userId?.toString())) {
      setIsCommentLiked(true);
    }
    setCommentLikeLength(data.likes.length);
  }, [userId]);

  useEffect(() => {
    console.log(isCommentLiked);
  }, [isCommentLiked]);

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 p-4 rounded-sm">
      <Link
        href={`/@${data?.user.username}/profile`}
        className="flex items-center gap-4 h-[40px]"
      >
        <Image
          src={data.user.avatar}
          width={300}
          height={300}
          alt={"user avatar"}
          className="rounded-full w-[40px] h-[40px] object-cover"
        />
        <div className="flex flex-col justify-between h-full">
          <span className="text-myGreen-600 text-sm">
            {data.user.displayName || data.user.username}
          </span>
          <span className="text-xs text-myText-500">
            {data.createdAt
              ? formatDistanceToNow(new Date(data.createdAt), {
                  addSuffix: true,
                  locale: faIR,
                })
              : ""}
          </span>
        </div>
      </Link>
      <div className="py-6 text-sm">{data.body}</div>
      <div className="flex items-center justify-between text-xl">
        {isCommentLiked ? (
          <button className="flex items-center gap-2">
            <GoHeartFill
              onClick={() => ToggleLikesCommentHandler(data._id)}
              className="text-red-600 transition"
            />
            <span className="text-base">{commentLikeLength}</span>
          </button>
        ) : (
          <button
            onClick={() => ToggleLikesCommentHandler(data._id)}
            className="flex items-center gap-2"
          >
            <GoHeart className="hover:text-red-600 transition" />
            <span className="text-base">{commentLikeLength}</span>
          </button>
        )}
        {username && (
          <button
            onClick={() => setIsReplyOpen(true)}
            className="text-myText-500 hover:text-myText-600 transition"
          >
            <FaReply />
          </button>
        )}
      </div>
      {isReplyOpen && (
        <form
          onSubmit={AddCommentHandler}
          className="mt-8 border border-zinc-200 dark:border-zinc-800 rounded-sm p-4"
        >
          <div className="flex items-center gap-4">
            <Image
              src={avatar || ""}
              width={200}
              height={200}
              alt={"user avatar"}
              className="rounded-full w-[30px] h-[30px] object-cover"
            />
            <div className="relative overflow-hidden w-full cursor-text">
              <span
                className={`text-myGreen-600 block transition duration-300 `}
              >
                {username}
              </span>
            </div>
          </div>

          <div>
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="bg-inherit text-sm mt-4 w-full min-h-[100px] max-h-[600px] outline-none"
              placeholder="نظر خود را بنویسید"
            />
            <div className="flex items-center justify-end gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <PrimaryBtn
                onPress={() => {
                  setIsReplyOpen(false);
                  setInput("");
                }}
                width="w-[130px]"
              >
                منصرف شدم
              </PrimaryBtn>
              <LoadingBtn
                isDisable={input === "" ? true : false}
                loading={loading}
                width="w-[130px]"
              >
                ارسال نظر
              </LoadingBtn>
            </div>
          </div>
        </form>
      )}
      <div className="flex flex-col gap-3 mt-4">
        {data.replies.map((e, i) => (
          <CommentReply key={i} data={e} />
        ))}
      </div>
    </div>
  );
  async function ToggleLikesCommentHandler(id: string) {
    if (!isCommentLiked) {
      setCommentLikeLength(commentLikeLength + 1);
    } else {
      setCommentLikeLength(commentLikeLength - 1);
    }
    setIsCommentLiked(!isCommentLiked);

    try {
      const res = await axios.put(`/api/post/comment/${id}`);
    } catch (error: any) {
      if (error.status === 401) {
        SendErrorToast("لطفا ابتدا وارد اکانت خود شوید");
      } else {
        SendErrorToast(
          `کامنت ${data.user.displayName || data.user.username} لایک نشد`
        );
      }
    }
  }
  async function AddCommentHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    const res = await dispatch(
      AddCommentToPost({
        id: data.post.toString(),
        body: input,
        replyTo: data._id,
      })
    );

    if (res.payload) {
      setLoading(false);
      SendSucToast("کامنت شما ثبت شد و پس از تایید نمایش داده میشود");
      setInput("");
      setIsReplyOpen(false);
    } else {
      setLoading(false);
      SendErrorToast("مشکلی در ثبت کامنت وجود دارد");
    }
  }
}
