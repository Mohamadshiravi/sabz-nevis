import LoadingBtn from "@/components/module/loadingBtn";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function AddDisplayNameForm() {
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
          location.href = "/";
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
    <section className="lg:w-[3000px] w-full bg-white h-full flex lg:items-center lg:mt-0 mt-8 justify-center">
      <form
        onSubmit={setDisplayNameHandler}
        className="flex flex-col items-center gap-3 sm:w-[500px] sm:px-0 px-4 w-full"
      >
        <Image
          src={"/images/guest-avatar.webp"}
          width={1000}
          height={1000}
          alt="guest"
          className="w-[200px] rounded-full"
        />
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          className="InpShadow mt-10 w-full outline-none border px-4 border-zinc-200 py-3 rounded-full shadow-md"
          placeholder="نام و نام خانوادگی "
        />
        <div className="flex items-center gap-4 justify-between w-full">
          <Link
            href={"/"}
            className="border-2 text-center w-full hover:bg-zinc-800 transition hover:text-white border-zinc-800 text-sm px-5 py-1.5 rounded-full vazir-medium"
          >
            رد کردن این مرحله
          </Link>
          <LoadingBtn fullWidth loading={loading}>
            ذخیره
          </LoadingBtn>
        </div>
      </form>
    </section>
  );
}
