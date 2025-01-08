"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import VirgoolModal from "@/components/module/virgoolModal";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AddDisplayNameModalProps = {
  CloseModal: () => void;
};
export default function AddDisplayNameModal({
  CloseModal,
}: AddDisplayNameModalProps) {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  async function setDisplayNameHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (displayName !== "") {
        const res = await axios.post("/api/auth/me/update", { displayName });
        if (res.status === 200) {
          SendSucToast("اطلاعات شما با موفقیت وارد شد");
          setLoading(false);
          location.reload();
        }
      } else {
        setLoading(false);
        SendErrorToast("یک نام درست وارد کنید");
      }
    } catch (error) {
      SendErrorToast("مشکلی پیش امده است");
      setLoading(false);
    }
  }
  return (
    <VirgoolModal CloseModal={CloseModal}>
      <form
        onSubmit={setDisplayNameHandler}
        className="flex flex-col items-center gap-3 w-full sm:px-20 px-8 py-10"
      >
        <Image
          src={"/images/guest-avatar.webp"}
          width={1000}
          height={1000}
          alt="guest"
          className="w-[200px] rounded-full object-cover"
        />
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          className="InpShadow mt-10 w-full outline-none bg-inherit border px-4 border-zinc-200 dark:border-zinc-700 py-3 rounded-full shadow-md"
          placeholder="نام و نام خانوادگی "
        />
        <div className="flex items-center gap-4 justify-between w-full">
          <button
            onClick={location.reload}
            className="border-2 text-center w-full hover:bg-zinc-800 transition hover:text-white border-zinc-800 text-sm px-5 py-1.5 rounded-full vazir-medium"
          >
            رد کردن این مرحله
          </button>
          <LoadingBtn fullWidth loading={loading}>
            ذخیره
          </LoadingBtn>
        </div>
      </form>
    </VirgoolModal>
  );
}
