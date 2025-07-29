"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { IoIosArrowBack } from "react-icons/io";
import VerifyCodeForm from "./verifyCodeForm";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import LoadingBtn from "@/components/module/loadingBtn";

export default function LoginForm() {
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [credential, setCredential] = useState("");

  const [loading, setLoading] = useState(false);

  async function sendCodeHandler(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    if (credential !== "") {
      try {
        const res = await axios.post("/api/auth/login/send", {
          credential: credential,
        });
        if (res.status === 201) {
          setLoading(false);
          setCredential(res.data.phone);
          setIsCodeSend(true);
        } else if (res.status === 202) {
          setLoading(false);
          location.href = "/home";
        }
      } catch (error: any) {
        setLoading(false);
        if (error.status === 404) {
          SendErrorToast("شماره موبایل یا نام کاربری شما پیدا نشد");
        } else {
          SendErrorToast("مشکلی در ارسال وجود دارد");
        }
      }
    } else {
      setLoading(false);
      SendErrorToast("نام کاربری یا شماره موبایل خود را وارد کنید");
    }
  }

  return !isCodeSend ? (
    <section className="lg:w-[750px] w-full bg-white h-full relative">
      <form
        onSubmit={sendCodeHandler}
        className="flex flex-col lg:justify-center w-full h-full gap-3 px-8"
      >
        <h1 className="vazir-black text-xl text-my-green-600 lg:mt-0 mt-8">
          ورود به حساب کاربری
        </h1>
        <h3 className="text-my-text-600">
          شماره موبایل یا نام کاربری خود را وارد کنید
        </h3>
        <div className="flex flex-col items-end gap-4">
          <input
            dir="ltr"
            onChange={(e) => {
              setCredential(e.target.value);
            }}
            value={credential}
            type="text"
            className="InpShadow w-full outline-hidden border px-4 border-zinc-200 py-3 rounded-full shadow-md"
            placeholder="شماره موبایل , نام کاربری"
          />
          <LoadingBtn
            icon={<IoIosArrowBack className="text-lg" />}
            loading={loading}
          >
            ورود به حساب کاربری
          </LoadingBtn>
          <Link href={"/register"} className="w-full text-center text-sm mt-10">
            عضو نیستید؟ ثبت نام کنید
          </Link>
        </div>
      </form>
      <Link
        href={"/register"}
        className="absolute bottom-10 lg:block hidden w-full text-center text-sm"
      >
        عضو نیستید؟ ثبت نام کنید
      </Link>
    </section>
  ) : (
    <VerifyCodeForm
      phone={credential}
      back={() => {
        setIsCodeSend(false);
      }}
    />
  );
}
