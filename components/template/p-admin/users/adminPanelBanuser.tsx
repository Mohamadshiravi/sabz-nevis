import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import PrimaryLoadingBtn from "@/components/module/primaryLoadingBtn";
import SabzModal from "@/components/module/sabzModal";
import { banUserModelType } from "@/models/banuser";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import { ChangeEvent, useState } from "react";

export default function AdminPanelBanUserField({
  data,
  reRenderUsers,
}: {
  data: banUserModelType;
  reRenderUsers?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800 p-4 rounded-md">
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <span>{data.phone}</span>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-2">
          <div className="flex flex-col gap-2">
            <PrimaryLoadingBtn
              width="w-[150px]"
              onPress={() => setIsModalOpen(true)}
            >
              رفع محدودیت کاربر
            </PrimaryLoadingBtn>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SabzModal
          CloseModal={() => {
            setIsModalOpen(false);
          }}
        >
          <form onSubmit={UnBanUserHandler} className="w-full p-6">
            <h3 className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center">
              ایا میخاهید محدودیت کاربر را بردارید ؟
            </h3>
            <h4 className="dark:border-zinc-800 text-center text-sm mt-6">
              با این کار شماره تلفن کاربر دوباره قابل ثبتنام در وبسایت میشود و
              کاربر میتواند برگردد
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

  async function UnBanUserHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.delete(`/api/user/ban/${data._id}`);
      SendSucToast("کاربر رفع محدودیت شد شد");
      setLoading(false);
      if (reRenderUsers) {
        reRenderUsers();
      }
      setIsModalOpen(false);
    } catch (error) {
      SendErrorToast("مشکلی پیش امد");
      setLoading(false);
    }
  }
}
