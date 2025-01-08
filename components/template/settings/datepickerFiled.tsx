"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import VirgoolModal from "@/components/module/virgoolModal";
import { updateUserDataToServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import { FormEvent, useEffect, useState } from "react";

export default function DatePickerField({ birthDay }: { birthDay?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const regex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;

  useEffect(() => {
    setValue(birthDay || "");
  }, []);

  async function UpdateHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (value !== birthDay && value !== "" && regex.test(value)) {
      const res = await dispatch(updateUserDataToServer({ birthDay: value }));
      if (res.payload) {
        console.log(res.payload);
        SendSucToast("تاریخ تولد شما تغییر کرد");
        setLoading(false);
        setIsModalOpen(false);
      } else {
        SendErrorToast("مشکلی پیش امد");
        setLoading(false);
      }
    } else {
      SendErrorToast("یک تاریخ با قالب ذکر شده یا غیر تکراری وارد کنید");
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
          <h3 className="vazir-medium">تاریخ تولد</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            تاریخ تولد در پروفایل نمایش داده نمی‌شود.
          </h4>
        </div>
        <span className="text-xs border border-zinc-200 px-4 py-1 rounded-md outline-none">
          {birthDay || "تاریخ تولد خود را وارد کنید"}
        </span>
      </div>
      {isModalOpen && (
        <VirgoolModal CloseModal={() => setIsModalOpen(false)}>
          <form onSubmit={UpdateHandler} className="w-full p-4">
            <h3 className="vazir-bold text-lg border-b border-zinc-200 dark:border-zinc-800 py-2">
              تاریخ تولد
            </h3>
            <input
              dir="ltr"
              placeholder="تاریخ تولد خود را وارد کنید نمونه : 1385/8/8"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="border-b bg-inherit dark:border-zinc-700 border-zinc-300 w-full px-2 py-1 outline-none mt-10"
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
        </VirgoolModal>
      )}
    </>
  );
}
