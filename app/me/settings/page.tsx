"use client";

import AboutField from "@/components/template/settings/aboutField";
import DatePickerField from "@/components/template/settings/datepickerFiled";
import DisplayNameField from "@/components/template/settings/displayNameField";
import LinkedInFiled from "@/components/template/settings/linkedinField";
import UploadProfilePhoto from "@/components/template/settings/uploadProfilePhoto";
import XProfileField from "@/components/template/settings/xProfileField";
import { updateUserDataToServer } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { useEffect, useState } from "react";

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
              <div className="bg-zinc-200 dark:bg-zinc-800 w-[100px] h-[35px]"></div>
              <div className="bg-zinc-200 dark:bg-zinc-800 w-[200px] h-[25px]"></div>
            </div>
            <div className="bg-zinc-200 dark:bg-zinc-800 w-[150px] h-[30px]"></div>
          </div>
        ))
      ) : (
        <>
          <DisplayNameField displayName={userData?.displayName} />
          <AboutField about={userData?.about} />
          <UploadProfilePhoto avatar={userData?.avatar} />
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
