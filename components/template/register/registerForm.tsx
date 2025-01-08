"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { IoIosArrowBack } from "react-icons/io";
import VerifyCodeForm from "./verifyCodeForm";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import LoadingBtn from "@/components/module/loadingBtn";

export default function RegisterForm() {
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [phoneInp, setPhoneInp] = useState("");

  const [loading, setLoading] = useState(false);

  const phoneRegex = /^09[0-9]{9}$/;

  async function sendCodeHandler(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    if (phoneRegex.test(phoneInp)) {
      try {
        const res = await axios.post("/api/auth/register/send", {
          phone: phoneInp,
        });
        if (res.status === 201) {
          setLoading(false);
          setIsCodeSend(true);
        }
      } catch (error: any) {
        setLoading(false);
        if (error.status === 422) {
          SendErrorToast("شماره موبایل تکراری است");
        } else {
          SendErrorToast("مشکلی در ارسال وجود دارد");
        }
      }
    } else {
      SendErrorToast("شماره موبایل  خود را درست وارد کنید");
    }
  }

  return !isCodeSend ? (
    <section className="lg:w-[750px] w-full bg-white h-full relative">
      <form
        onSubmit={sendCodeHandler}
        className="flex flex-col lg:justify-center w-full h-full gap-3 px-8"
      >
        <h1 className="vazir-black text-xl text-virgoolBlue lg:mt-0 mt-8">
          ایجاد حساب کاربری
        </h1>
        <h3 className="text-virgoolText-600">شماره موبایل خود را وارد کنید</h3>
        <div className="flex flex-col items-end gap-4">
          <input
            onChange={(e) => setPhoneInp(e.target.value)}
            value={phoneInp}
            dir="ltr"
            type="number"
            className="InpShadow w-full outline-none border px-4 border-zinc-200 py-3 rounded-full shadow-md"
            placeholder="شماره موبایل "
          />
          <LoadingBtn
            loading={loading}
            icon={<IoIosArrowBack className="text-lg" />}
          >
            ایجاد حساب کاربری
          </LoadingBtn>
          <Link href={"/login"} className="w-full text-center text-sm mt-10">
            قبلا عضو شده‌اید؟ رفتن به صفحه ورود
          </Link>
        </div>
      </form>
      <Link
        href={"/login"}
        className="absolute bottom-10 lg:block hidden w-full text-center text-sm"
      >
        قبلا عضو شده‌اید؟ رفتن به صفحه ورود
      </Link>
    </section>
  ) : (
    <VerifyCodeForm
      phone={phoneInp}
      back={() => {
        setIsCodeSend(false);
      }}
    />
  );
}
