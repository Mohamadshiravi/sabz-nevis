"use client";

import { RiLock2Fill } from "react-icons/ri";
import { ListModelType } from "@/models/list";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PrimaryBtn from "@/components/module/primaryBtn";
import Link from "next/link";
import LoadingBtn from "@/components/module/loadingBtn";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import SabzModal from "@/components/module/sabzModal";

export default function AdminPanelList({
  data,
  reRenderLists,
}: {
  data: ListModelType;
  reRenderLists?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col bg-zinc-100 dark:bg-darkColor-700 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden">
        <div className="text-myText-600 flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 p-3">
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
        <div className="flex w-full justify-between sm:flex-row flex-col">
          <div className="px-4 flex flex-col justify-between">
            <h3 className="vazir-bold sm:text-2xl text-xl mt-4">{data.name}</h3>
            <div className="flex items-center gap-6 py-4 sm:mt-0 mt-2">
              <LoadingBtn
                width="sm:w-[130px] w-full"
                loading={loading}
                onPress={() => setIsModalOpen(true)}
              >
                حذف
              </LoadingBtn>
              <PrimaryBtn
                width="sm:w-[130px] w-full"
                onPress={() =>
                  router.push(`/@${data.user.username}/list/${data._id}`)
                }
              >
                مشاهده لیست
              </PrimaryBtn>
              {data.status === "private" && <RiLock2Fill />}
            </div>
          </div>
          {data.posts.length !== 0 ? (
            <div className="grid sm:h-[200px] h-[100px] sm:w-[200px] w-full sm:grid-cols-[6fr_6fr] grid-cols-[3fr_3fr_3fr_3fr] sm:gap-0.5 gap-1">
              {data.posts.slice(0, 3).map((e, i) => (
                <Image
                  key={i}
                  alt="post cover"
                  width={600}
                  height={600}
                  src={e.cover || "/images/img-default.jpg"}
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm text-myText-400 sm:h-[200px] h-[100px] sm:w-[200px] w-full">
              پستی موجود نیست
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <SabzModal
          CloseModal={() => {
            setIsModalOpen(false);
          }}
        >
          <form onSubmit={DeleteList} className="w-full p-6">
            <h3 className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center">
              ایا میخاهید لیست را حذف کنید ؟
            </h3>
            <h4 className="dark:border-zinc-800 text-center text-sm mt-6">
              با این کار لیست به طور کامل از دیتابیس پاک خواهد شد و امکان بازگشت
              وجود ندارد
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
  async function DeleteList(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.delete(`/api/list/${data._id}`);
      SendSucToast("لیست با موفقیت حذف شد");
      setLoading(false);
      if (reRenderLists) {
        reRenderLists();
      }
      setIsModalOpen(false);
    } catch (error) {
      SendErrorToast("مشکلی پیش امد");
      setLoading(false);
    }
  }
}
