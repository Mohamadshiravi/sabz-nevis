"use client";

import PrimaryBtn from "@/components/module/primaryBtn";
import BlockContactField from "@/components/template/settings/account/blockContactField";
import EmailField from "@/components/template/settings/account/emailField";
import PhoneField from "@/components/template/settings/account/phoneField";
import UsernameFiled from "@/components/template/settings/account/usernameField";
import { useTypedSelector } from "@/redux/typedHooks";
import ShowSwal from "@/utils/modalFunctions";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function SettingsAccount() {
  const [loading, setLoading] = useState(true);
  const { data: userData, loading: reduxLoading } = useTypedSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (reduxLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  });
  return (
    <div className="flex flex-col gap-10 pt-10 lg:pb-10 pb-20">
      {loading ? (
        Array.from({ length: 8 }).map((e, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="bg-zinc-100 dark:bg-zinc-800 w-[90px] h-[35px]"></div>
            <div className="bg-zinc-100 dark:bg-zinc-800 w-[150px] h-[30px]"></div>
          </div>
        ))
      ) : (
        <>
          <UsernameFiled username={userData?.username} />
          <EmailField email={userData?.email} />
          <PhoneField phone={userData?.phone} />
          <hr className="border-1 border-zinc-200 dark:border-zinc-800" />

          <div className="flex items-center justify-between w-full">
            <h3 className="vazir-medium">تغییر رمز عبور</h3>
            <FaEdit className="text-xl" />
          </div>
          <div className="flex items-center justify-between w-full">
            <h3 className="vazir-medium">فراموشی رمز عبور</h3>
            <FaEdit className="text-xl" />
          </div>

          <hr className="border-1 border-zinc-200 dark:border-zinc-800" />

          <BlockContactField />
          <div className="flex sm:flex-row flex-col gap-2 items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <h3 className="vazir-medium">حذف حساب کاربری</h3>
              <h4 className="text-virgoolText-600 text-sm pl-2">
                با حذف حساب کاربری، تمام اطلاعات شما از سرورهای ما حذف می‌شود
              </h4>
            </div>
            <PrimaryBtn onPress={DeleteAccountHandler}>
              حذف حساب کاربری
            </PrimaryBtn>
          </div>
        </>
      )}
    </div>
  );
  async function DeleteAccountHandler() {
    const isOk = await ShowSwal(
      "warning",
      "ایا از حذف ااکانت خود مطمعن هستید؟",
      "منصرف شدم",
      "بله"
    );
    if (isOk) {
      await axios.delete("/api/auth/delete");
      location.reload();
    }
  }
}
