"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import VirgoolModal from "@/components/module/virgoolModal";
import { fetchUserDataFromServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

export default function PhoneField({ phone }: { phone?: string }) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isVerifyCodeModalOpen, setIsVerifyCodeModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(120);

  const [phoneInp, setPhoneInp] = useState("");

  const regex = /^09[0-9]{9}$/;

  useEffect(() => {
    setPhoneInp(phone || "");
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const codeClone: string[] = code;
    if (+e.target.value.length === 1) {
      codeClone[index] = e.target.value;
      const NextInp = document.getElementById(`modalCodeInp${index + 1}`);
      NextInp?.focus();
    } else {
      codeClone[index] = "";
      const PrewInp = document.getElementById(`modalCodeInp${index - 1}`);
      PrewInp?.focus();
    }
    setCode(codeClone);
  }

  const dispatch = useTypedDispatch();
  return (
    <>
      <div
        onClick={() => setIsRegisterModalOpen(true)}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <h3 className="vazir-medium">شماره موبایل</h3>
        <div className="flex items-center gap-2">
          <span>{phone}</span>
          <FaEdit className="text-xl" />
        </div>
      </div>
      {isRegisterModalOpen && (
        <VirgoolModal CloseModal={() => setIsRegisterModalOpen(false)}>
          <form onSubmit={sendCodeHandler} className="w-full p-4">
            <h3 className="vazir-bold text-lg border-b border-zinc-200 dark:border-zinc-800 py-2">
              ایمیل
            </h3>
            <input
              dir="ltr"
              placeholder=" شماره موبایل خود را وارد کنید"
              onChange={(e) => setPhoneInp(e.target.value)}
              value={phoneInp}
              type="text"
              className="border-b border-zinc-300 bg-inherit dark:border-zinc-700 w-full px-2 py-1 outline-none mt-10"
            />
            <div className="flex items-center justify-end gap-3 mt-10">
              <PrimaryBtn onPress={() => setIsRegisterModalOpen(false)}>
                منصرف شدم
              </PrimaryBtn>
              <LoadingBtn loading={loading} width="w-[90px]">
                ذخیره
              </LoadingBtn>
            </div>
          </form>
        </VirgoolModal>
      )}
      {isVerifyCodeModalOpen && (
        <VirgoolModal CloseModal={() => setIsVerifyCodeModalOpen(false)}>
          <form
            onSubmit={HandlerVerifyCode}
            className={`bg-white flex flex-col sm:px-20 px-8 gap-2 py-16 items-center`}
          >
            <h1 className="vazir-black text-xl text-myGreen-600 lg:mt-0 mt-8">
              کد تائید را وارد کنید
            </h1>
            <h3 className="text-virgoolText-600">
              کد تائید برای شماره موبایل
              <span className="vazir-bold px-1 underline">{phoneInp}</span>
              ارسال گردید
            </h3>
            <div className="flex flex-row-reverse items-center gap-2 font-sans font-bold">
              {[...Array(6)].map((_, i) => (
                <input
                  id={`modalCodeInp${i}`}
                  key={i}
                  maxLength={1}
                  type="tel"
                  className="InpShadow outline-none text-center border border-zinc-200 py-3 rounded-full sm:w-[50px] w-[40px] sm:h-[50px] h-[40px] p-1"
                  onChange={(e) => handleInputChange(e, i)}
                />
              ))}
            </div>
            <div className="flex flex-col items-center gap-4 mt-10">
              {seconds === 0 ? (
                <button className="text-myGreen-600 text-sm">
                  ارسال مجدد کد
                </button>
              ) : (
                <span className="text-myGreen-600 text-sm">
                  تا ارسال مجدد کد : {formatTime(seconds)}
                </span>
              )}
              <LoadingBtn fullWidth loading={loading}>
                تائید و ادامه
              </LoadingBtn>
              <button
                onClick={() => {
                  setIsRegisterModalOpen(true);
                  setIsVerifyCodeModalOpen(false);
                }}
                className="flex text-nowrap lg:w-auto w-full text-sm items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 transition rounded-md px-4 py-2 text-virgoolText-600"
              >
                <IoIosArrowForward className="text-lg" />
                برگشت به مرحله قبل
              </button>
            </div>
          </form>
        </VirgoolModal>
      )}
    </>
  );
  async function sendCodeHandler(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    if (regex.test(phoneInp)) {
      try {
        const res = await axios.post("/api/auth/register/send", {
          phone: phoneInp,
        });
        if (res.status === 201) {
          setLoading(false);
          setIsRegisterModalOpen(false);
          setIsVerifyCodeModalOpen(true);
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
      setLoading(false);
      SendErrorToast("شماره موبایل  خود را درست وارد کنید");
    }
  }
  async function HandlerVerifyCode(e: FormEvent) {
    e.preventDefault();
    const joinedCode = code.join("");

    setLoading(true);

    try {
      const res = await axios.post("/api/auth/change", {
        phone: phoneInp,
        code: joinedCode,
      });
      setLoading(false);
      SendSucToast("شماره موبایل شما تغییر کرد");
      dispatch(fetchUserDataFromServer());
      setIsVerifyCodeModalOpen(false);
    } catch (e) {
      setLoading(false);
      SendErrorToast("کد اشتباه است یا زمان ان تمام شده است");
    }
  }
}
