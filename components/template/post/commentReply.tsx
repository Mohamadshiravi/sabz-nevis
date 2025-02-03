"use client";

import { CommentModelType } from "@/models/comment";
import { useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function CommentReply({ data }: { data: CommentModelType }) {
  const [loading, setLoading] = useState(false);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [commentLikeLength, setCommentLikeLength] = useState(0);

  const userId = useTypedSelector((state) => state.user).data?._id;

  useEffect(() => {
    if (data.likes.some((e) => e.toString() === userId?.toString())) {
      setIsCommentLiked(true);
    }
    setCommentLikeLength(data.likes.length);
  }, [userId]);

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 p-4">
      <Link
        href={`/@${data.user.username}/profile`}
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
          <button
            onClick={() => ToggleLikesCommentHandler(data._id)}
            className="flex items-center gap-2"
          >
            <GoHeartFill className="text-red-600 transition" />
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
      await axios.put(`/api/post/comment/${id}`);
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
}
