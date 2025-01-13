"use client";

import AboutField from "@/components/template/settings/aboutField";
import DatePickerField from "@/components/template/settings/datepickerFiled";
import DisplayNameField from "@/components/template/settings/displayNameField";
import LinkedInFiled from "@/components/template/settings/linkedinField";
import XProfileField from "@/components/template/settings/xProfileField";
import { updateUserDataToServer } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";

export default function SettingsMain() {
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

  async function ChangeGenderHandler(value: string) {
    dispatch(updateUserDataToServer({ gender: value }));
  }

  const dispatch = useTypedDispatch();

  return (
    <div className="flex flex-col gap-10 pt-10 lg:pb-10 pb-20">
      {loading ? (
        Array.from({ length: 8 }).map((e, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <div className="bg-zinc-100 dark:bg-zinc-800 w-[100px] h-[35px]"></div>
              <div className="bg-zinc-100 dark:bg-zinc-800 w-[200px] h-[25px]"></div>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 w-[150px] h-[30px]"></div>
          </div>
        ))
      ) : (
        <>
          <DisplayNameField displayName={userData?.displayName} />
          <AboutField about={userData?.about} />
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <h3 className="vazir-medium">عکس پروفایل</h3>
              <h4 className="text-myText-600 text-sm pl-2">
                عکس شما در صفحه پروفایل و پست‌ها نمایش داده می‌شود.
              </h4>
            </div>
            <label className="relative w-[60px] h-[60px] group">
              <input type="file" className="w-0 h-0 absolute top-[1000px]" />
              <Image
                width={600}
                height={600}
                alt="test"
                src={"/images/avatar-default.jpg"}
                className="w-full h-full object-cover rounded-full"
              />
              <div className="bg-black/40 group-hover:opacity-100 transition duration-300 opacity-0 cursor-pointer rounded-full w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <MdPhotoCamera className="text-zinc-300 text-xl" />
              </div>
            </label>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <h3 className="vazir-medium">جنسیت</h3>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <span>مرد</span>
                <input
                  onChange={(e) => ChangeGenderHandler("مرد")}
                  type="radio"
                  checked={userData?.gender === "مرد" ? true : false}
                />
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <span>زن</span>
                <input
                  onChange={(e) => ChangeGenderHandler("زن")}
                  type="radio"
                  checked={userData?.gender === "زن" ? true : false}
                />
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <span>سایر</span>
                <input
                  onChange={(e) => ChangeGenderHandler("سایر")}
                  type="radio"
                  checked={userData?.gender === "سایر" ? true : false}
                />
              </label>
            </div>
          </div>
          <DatePickerField birthDay={userData?.birthDay} />
          <XProfileField xProfile={userData?.xProfile} />
          <LinkedInFiled linkedin={userData?.linkedin} />
        </>
      )}
    </div>
  );
}
