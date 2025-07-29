"use client";

import { PostModelType } from "@/models/post";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import Link from "next/link";
import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import SabzModal from "@/components/module/sabzModal";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";

export default function AdminPanelPosts({
  data,
  reRenderPosts,
}: {
  data: PostModelType;
  reRenderPosts?: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 p-4 rounded-md">
        <div className="text-my-text-600 flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <Link
            href={`/@${data?.user.username}/profile`}
            className="flex items-center gap-1"
          >
            <Image
              alt={"user avatar"}
              width={200}
              height={200}
              src={data?.user.avatar || "/images/avatar-default.jpg"}
              className="w-[30px] h-[30px] rounded-full ml-3 object-cover"
            />
            <span className="text-sm text-sm text-zinc-800 dark:text-white">
              {data?.user.displayName
                ? data?.user.displayName
                : data?.user.username}
            </span>
          </Link>
        </div>
        <div className="w-full flex items-center justify-between mt-3">
          <div className="flex flex-col gap-0">
            <div className="vazir-bold text-xl">{data.title}</div>
            <div className="text-my-text-500 text-sm mt-6">
              اخرین ویرایش :
              {data?.updatedAt
                ? formatDistanceToNow(new Date(data.updatedAt), {
                    addSuffix: true,
                    locale: faIR,
                  })
                : ""}
            </div>
            <div className="text-my-text-500 text-sm mt-2">
              ساخته شده در :
              {data?.createdAt
                ? formatDistanceToNow(new Date(data.createdAt), {
                    addSuffix: true,
                    locale: faIR,
                  })
                : ""}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <LoadingBtn
              width="sm:w-[140px] w-[100px]"
              onPress={() => setIsModalOpen(true)}
            >
              حذف
            </LoadingBtn>
            <PrimaryBtn
              width="sm:w-[140px] w-[100px]"
              onPress={() =>
                router.push(`/@${data?.user.username}/posts/${data?._id}`)
              }
            >
              مشاهده
            </PrimaryBtn>
          </div>
        </div>
        {isModalOpen && (
          <SabzModal
            CloseModal={() => {
              setIsModalOpen(false);
            }}
          >
            <form onSubmit={DeletePostHandler} className="w-full p-6">
              <h3 className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center">
                ایا میخاهید پست را حذف کنید ؟
              </h3>
              <h4 className="dark:border-zinc-800 text-center text-sm mt-6">
                با این کار پست به طور کامل از دیتابیس ما پاک خواهد شد و امکان
                بازگشت وجود ندارد
              </h4>
              <div className="flex items-center justify-center gap-4 mt-28">
                <LoadingBtn width={"w-[150px]"} loading={loading}>
                  بله
                </LoadingBtn>
                <PrimaryBtn
                  onPress={() => setIsModalOpen(false)}
                  width="w-[150px]"
                >
                  منصرف شدم
                </PrimaryBtn>
              </div>
            </form>
          </SabzModal>
        )}
      </div>
    </>
  );

  async function DeletePostHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.delete(`/api/post/${data._id}`);
      SendSucToast("پست با موفقیت حذف شد");
      if (reRenderPosts) {
        reRenderPosts();
      }
      setLoading(false);
      setIsModalOpen(false);

      if (localStorage.postId === data._id) {
        localStorage.removeItem("postId");
      }
    } catch (error) {
      SendErrorToast("مشکلی پیش امده");
      setLoading(false);
    }
  }
}
