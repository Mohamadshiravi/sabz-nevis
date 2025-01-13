"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import SabzModal from "@/components/module/sabzModal";
import { updateUserDataToServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import { FormEvent, useEffect, useState } from "react";

export default function LinkedInFiled({ linkedin }: { linkedin?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(linkedin || "");
  }, []);

  async function UpdateHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (value !== linkedin && value !== "") {
      const res = await dispatch(updateUserDataToServer({ linkedin: value }));
      if (res.payload) {
        console.log(res.payload);
        SendSucToast(" پروفایل لینکدین شما تغییر کرد");
        setLoading(false);
        setIsModalOpen(false);
      } else {
        SendErrorToast("مشکلی پیش امد");
        setLoading(false);
      }
    } else {
      SendErrorToast("نام کاربری خود را کامل و غیر تکراری وارد کنید");
      setLoading(false);
    }
  }

  const dispatch = useTypedDispatch();
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <div className="flex flex-col gap-2">
          <h3 className="vazir-medium">پروفایل لینکدین</h3>
          <h4 className="text-myText-600 text-sm pl-2">
            نام کاربری شما در لینکدین
          </h4>
        </div>
        <PrimaryBtn>{linkedin || "افزودن"}</PrimaryBtn>
      </div>
      {isModalOpen && (
        <SabzModal CloseModal={() => setIsModalOpen(false)}>
          <form onSubmit={UpdateHandler} className="w-full p-4">
            <h3 className="vazir-bold text-lg border-b border-zinc-200 dark:border-zinc-800 py-2">
              پروفایل لینکدین
            </h3>
            <input
              dir="ltr"
              placeholder=" نام کاربری شما در لینکدین"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="border-b bg-inherit border-zinc-300 dark:border-zinc-700 w-full px-2 py-1 outline-none mt-10"
            />
            <div className="flex items-center justify-end gap-3 mt-10">
              <PrimaryBtn onPress={() => setIsModalOpen(false)}>
                منصرف شدم
              </PrimaryBtn>
              <LoadingBtn loading={loading} width="w-[90px]">
                ذخیره
              </LoadingBtn>
            </div>
          </form>
        </SabzModal>
      )}
    </>
  );
}
