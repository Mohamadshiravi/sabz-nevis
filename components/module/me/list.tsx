"use client";

import { RiLock2Fill } from "react-icons/ri";
import { ListModelType } from "@/models/list";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PrimaryBtn from "../primaryBtn";
import { ChangeEvent, useState } from "react";
import LoadingBtn from "../loadingBtn";
import SabzModal from "../sabzModal";
import axios from "axios";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { deleteListFromServer } from "@/redux/slices/list";

export default function List({
  data,
  reRenderLists,
  useRedux,
  isDeletable,
}: {
  data: ListModelType;
  reRenderLists?: () => void;
  useRedux?: boolean;
  isDeletable?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const dispatch = useTypedDispatch();

  return (
    <>
      <div className="flex w-full justify-between sm:flex-row flex-col bg-zinc-100 dark:bg-darkColor-700 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden">
        <div className="px-4 flex flex-col justify-between">
          <h3 className="vazir-bold sm:text-2xl text-xl mt-4">{data.name}</h3>
          <div className="flex items-center gap-2 py-4 sm:mt-0 mt-2">
            {isDeletable && data.name !== "پست های ذخیره شده" && (
              <LoadingBtn
                width="sm:w-[130px] w-full"
                loading={loading}
                onPress={() => setIsModalOpen(true)}
              >
                حذف
              </LoadingBtn>
            )}
            <PrimaryBtn
              width="sm:w-[130px] w-full"
              onPress={() =>
                router.push(`/@${data.user.username}/list/${data._id}`)
              }
            >
              مشاهده لیست
            </PrimaryBtn>
            {data.status === "private" && <RiLock2Fill className="mx-2" />}
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
          <div className="flex items-center pb-3 justify-center w-full h-full text-sm text-myText-400 sm:h-[200px] h-[100px] sm:w-[200px] w-full">
            پستی موجود نیست
          </div>
        )}
      </div>
      {isModalOpen && (
        <SabzModal
          CloseModal={() => {
            setIsModalOpen(false);
          }}
        >
          <form
            onSubmit={useRedux ? DeleteListWithRedux : DeleteList}
            className="w-full p-6"
          >
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

  async function DeleteListWithRedux(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    const res = await dispatch(deleteListFromServer(data._id));
    if (res.payload) {
      SendSucToast("لیست حذف شد");
      setLoading(false);
      setIsModalOpen(false);
    } else {
      SendErrorToast("لیست حذف نشد");
      setLoading(false);
    }
  }
}
