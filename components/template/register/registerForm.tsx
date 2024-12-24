"use client";

import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function RegisterForm() {
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [phoneInp, setPhoneInp] = useState("");
  const [code, setCode] = useState<string[]>([]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const codeClone: string[] = code;
    if (+e.target.value.length === 1) {
      codeClone[index] = e.target.value;
      const NextInp = document.getElementById(`codeInp${index + 1}`);
      NextInp?.focus();
    } else {
      codeClone[index] = "";
      const PrewInp = document.getElementById(`codeInp${index - 1}`);
      PrewInp?.focus();
    }
    setCode(codeClone);
  }

  function sendCodeHandler(e: FormEvent) {
    e.preventDefault();

    if (+phoneInp.length === 11) {
      setIsCodeSend(true);
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
          <button className="flex text-nowrap lg:w-auto w-full text-sm items-center justify-center gap-4 bg-virgoolBlue hover:bg-virgoolBlueHover transition rounded-full pr-5 pl-3 py-2 text-white">
            ایجاد حساب کاربری
            <IoIosArrowBack className="text-lg" />
          </button>
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
    <section className="lg:w-[3000px] w-full bg-white h-full flex lg:items-center lg:mt-0 mt-8 justify-center">
      <form className="flex flex-col items-center gap-3 w-[600px]">
        <h1 className="vazir-black text-xl text-virgoolBlue lg:mt-0 mt-8">
          کد تائید را وارد کنید
        </h1>
        <h3 className="text-virgoolText-600">
          کد تائید برای شماره موبایل
          <span className="vazir-bold px-1 underline">{phoneInp}</span> ارسال
          گردید
        </h3>
        <div className="flex flex-row-reverse items-center gap-2 font-sans font-bold">
          {[...Array(6)].map((_, i) => (
            <input
              id={`codeInp${i}`}
              key={i}
              maxLength={1}
              type="tel"
              className="InpShadow outline-none text-center border border-zinc-200 py-3 rounded-full sm:w-[50px] w-[40px] sm:h-[50px] h-[40px] p-1"
              onChange={(e) => handleInputChange(e, i)}
            />
          ))}
        </div>
        <div className="flex flex-col items-center lg:gap-10 gap-4 mt-10">
          <span className="text-virgoolBlue text-sm">ارسال مجدد کد</span>
          <button className="flex text-nowrap lg:w-auto w-full text-sm items-center justify-center gap-4 bg-orange-500 hover:bg-orange-600 transition rounded-full px-8 py-2 text-white">
            تائید و ادامه
          </button>
          <button className="flex text-nowrap lg:w-auto w-full text-sm items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 transition rounded-md px-4 py-2 text-virgoolText-600">
            <IoIosArrowForward className="text-lg" />
            برگشت به مرحله قبل
          </button>
        </div>
      </form>
    </section>
  );
}
