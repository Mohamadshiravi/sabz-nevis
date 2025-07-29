"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import SabzModal from "@/components/module/sabzModal";
import EmailField from "@/components/template/settings/account/emailField";
import PhoneField from "@/components/template/settings/account/phoneField";
import UsernameFiled from "@/components/template/settings/account/usernameField";
import { useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function SettingsAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userData, loading } = useTypedSelector((state) => state.user);
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <div className="flex flex-col gap-10 pt-10 lg:pb-10 pb-20">
      {loading ? (
        Array.from({ length: 8 }).map((e, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="bg-zinc-200 dark:bg-zinc-800 w-[90px] h-[35px]"></div>
            <div className="bg-zinc-200 dark:bg-zinc-800 w-[150px] h-[30px]"></div>
          </div>
        ))
      ) : (
        <>
          <UsernameFiled username={userData?.username} />
          <EmailField email={userData?.email} />
          <PhoneField phone={userData?.phone} />
          <hr className="border border-zinc-200 dark:border-zinc-800" />

          <div className="flex sm:flex-row flex-col gap-3 items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <h3 className="vazir-medium">حذف حساب کاربری</h3>
              <h4 className="text-my-text-600 text-sm pl-2">
                با حذف حساب کاربری، تمام اطلاعات شما از سرورهای ما حذف می‌شود
              </h4>
            </div>
            <PrimaryBtn
              width="sm:w-[150px] w-full"
              onPress={() => {
                setIsModalOpen(true);
              }}
            >
              حذف حساب کاربری
            </PrimaryBtn>
          </div>
          {isModalOpen && (
            <SabzModal
              CloseModal={() => {
                setIsModalOpen(false);
              }}
            >
              <form onSubmit={DeleteAccountHandler} className="w-full p-6">
                <h3 className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center">
                  ایا میخاهید اکانت خود را حذف کنید
                </h3>
                <h4 className="dark:border-zinc-800 text-center mt-6">
                  با این کار حساب کاربری و تمام اطلاعات شما حذف خواهد شد !
                </h4>
                <div className="flex items-center justify-center gap-4 mt-28">
                  <LoadingBtn width={"w-[150px]"} loading={btnLoading}>
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
      )}
    </div>
  );
  async function DeleteAccountHandler(e: ChangeEvent<HTMLFormElement>) {
    setBtnLoading(true);
    e.preventDefault();
    try {
      const res = await axios.delete("/api/auth/delete");
      setBtnLoading(false);
      setTimeout(() => {
        location.reload();
      }, 300);
    } catch (error) {
      SendErrorToast("مشکلی پیش امد");
      setBtnLoading(false);
    }
  }
}
