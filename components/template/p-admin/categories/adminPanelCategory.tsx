import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import SabzModal from "@/components/module/sabzModal";
import { CategoryModelType } from "@/models/category";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function AdminPanelCategory({
  data,
  reRender,
}: {
  data: CategoryModelType;
  reRender?: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="sm:text-lg flex items-center justify-between gap-4 text-base shadow-lg border-2 border-dashed px-4 flex-grow py-2 vazir-medium rounded-md transition cursor-pointer text-center text-myText-800 dark:text-myText-500 border border-myText-800 dark:border-myText-500">
        {data.name}
        <div className="flex items-center gap-3">
          <Link href={`/category/${data._id}`}>
            <FaEye className="text-zinc-400 hover:text-white transition text-xl" />
          </Link>

          <MdDelete
            onClick={() => setIsModalOpen(true)}
            className="text-zinc-400 hover:text-white transition text-xl"
          />
        </div>
      </div>
      {isModalOpen && (
        <SabzModal
          CloseModal={() => {
            setIsModalOpen(false);
          }}
        >
          <form onSubmit={DeleteCategoryHandler} className="w-full p-6">
            <h3 className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center">
              ایا میخاهید موضوع را حذف کنید ؟
            </h3>
            <h4 className="dark:border-zinc-800 text-center text-sm mt-6">
              با این کار موضوع به طور کامل از دیتابیس پاک خواهد شد و امکان
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
  async function DeleteCategoryHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.delete(`/api/category/${data._id}`);
      SendSucToast("موضوع با موفقیت حذف شد");
      if (reRender) {
        reRender();
      }
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      SendErrorToast("مشکلی پیش امده");
      setLoading(false);
    }
  }
}
