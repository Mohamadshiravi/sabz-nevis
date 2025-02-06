"use client";

import { PostModelType } from "@/models/post";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import LoadingBtn from "./loadingBtn";
import PrimaryBtn from "./primaryBtn";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import SabzModal from "./sabzModal";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";

export default function ProfilePost({
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
      <div className="w-full flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 py-6">
        <div className="flex flex-col gap-6">
          <h2 className="vazir-bold text-xl">{data.title}</h2>
          <div className="text-myText-500 text-sm">
            اخرین ویرایش :
            {data?.updatedAt
              ? formatDistanceToNow(new Date(data.updatedAt), {
                  addSuffix: true,
                  locale: faIR,
                })
              : ""}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <LoadingBtn width="sm:w-[140px] w-[100px]" onPress={EditPostHandler}>
            ویرایش
          </LoadingBtn>
          <PrimaryBtn
            width="sm:w-[140px] w-[100px]"
            onPress={() => setIsModalOpen(true)}
          >
            حذف
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
    </>
  );
  function EditPostHandler() {
    localStorage.setItem("postId", data._id);
    router.push("/post/create");
  }
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
