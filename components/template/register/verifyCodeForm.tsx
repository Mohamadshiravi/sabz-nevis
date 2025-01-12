import LoadingBtn from "@/components/module/loadingBtn";
import { fetchUserDataFromServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import AddDisplayNameForm from "./addDisplayNameForm";

type VerifyCodeFormProp = {
  phone: string;
  back: () => void;
};

export default function VerifyCodeForm({ phone, back }: VerifyCodeFormProp) {
  const [code, setCode] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(120);

  const [loading, setLoading] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds]);

  useEffect(() => {
    document.getElementById(`codeInp0`)?.focus();
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

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

  const dispatch = useTypedDispatch();

  return (
    <>
      {!isCodeVerified ? (
        <section className="lg:w-[3000px] w-full bg-white h-full flex lg:items-center lg:mt-0 mt-8 justify-center">
          <form
            onSubmit={HandlerVerifyCode}
            className="flex flex-col items-center gap-3 w-[600px]"
          >
            <h1 className="vazir-black text-xl text-myGreen-600 lg:mt-0 mt-8">
              کد تائید را وارد کنید
            </h1>
            <h3 className="text-virgoolText-600">
              کد تائید برای شماره موبایل
              <span className="vazir-bold px-1 underline">{phone}</span> ارسال
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
              {seconds === 0 ? (
                <button
                  onClick={SendCodeAgain}
                  className="text-myGreen-600 text-sm"
                >
                  ارسال مجدد کد
                </button>
              ) : (
                <span className="text-myGreen-600 text-sm">
                  تا ارسال مجدد کد : {formatTime(seconds)}
                </span>
              )}
              <LoadingBtn loading={loading}>تائید و ادامه</LoadingBtn>
              <button
                onClick={back}
                className="flex text-nowrap lg:w-auto w-full text-sm items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 transition rounded-md px-4 py-2 text-virgoolText-600"
              >
                <IoIosArrowForward className="text-lg" />
                برگشت به مرحله قبل
              </button>
            </div>
          </form>
        </section>
      ) : (
        <AddDisplayNameForm />
      )}
    </>
  );
  async function HandlerVerifyCode(e: FormEvent) {
    e.preventDefault();
    const joinedCode = code.join("");

    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register/verify", {
        phone,
        code: joinedCode,
      });
      setLoading(false);
      SendSucToast("اکانت شما با موفقیت ساخته شد");
      dispatch(fetchUserDataFromServer());
      setIsCodeVerified(true);
    } catch (e) {
      setLoading(false);
      SendErrorToast("کد اشتباه است یا زمان ان تمام شده است");
    }
  }
  async function SendCodeAgain(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register/send", {
        phone,
      });
      if (res.status === 201) {
        setSeconds(120);
        setLoading(false);
        SendSucToast("کد مجددا برای شما ارسال شد");
      }
    } catch (e) {
      setLoading(false);
      SendErrorToast("مشکلی در ارسال وجود دارد");
    }
  }
}
