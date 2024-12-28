import { FormEvent, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import VerifyCodeInModal from "./verifyCodeForm";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import LoadingBtn from "@/components/module/loadingBtn";

type RegisterModalProps = {
  value: string;
  CloseModal: () => void;
};
export default function RegisterModal({
  value,
  CloseModal,
}: RegisterModalProps) {
  const [phoneInp, setPhoneInp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isCodeSend, setIsCodeSend] = useState(false);

  const phoneRegex = /^09[0-9]{9}$/;

  useEffect(() => {
    setPhoneInp(value);
  }, []);

  function AnimateCloseModal() {
    setIsModalOpen(false);
    setTimeout(() => {
      CloseModal();
    }, 300);
  }

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
  return (
    <>
      <section
        onClick={AnimateCloseModal}
        className={`${
          isModalOpen ? "opacity-100" : "opacity-0"
        } fade-animate transition duration-300 w-full h-screen bg-white/50 backdrop-blur-md fixed top-0 left-0 z-40`}
      ></section>
      {isCodeSend ? (
        <VerifyCodeInModal
          CloseModal={AnimateCloseModal}
          isModalOpen={isModalOpen}
          phone={phoneInp}
          back={() => {
            setIsCodeSend(false);
          }}
        />
      ) : (
        <form
          onSubmit={sendCodeHandler}
          className={`${
            isModalOpen ? "scale-[100%] opacity-1" : "scale-[80%] opacity-0"
          } transition duration-300 open-animate z-50 bg-white flex flex-col sm:px-20 px-8 gap-2 py-16 rounded-md shadow-xl items-center lg:w-[40%] w-[86%] fixed top-[30%] lg:left-[30%] left-[7%]`}
        >
          <h3 className="text-lg vazir-bold text-virgoolBlue">
            ایجاد حساب کاربری
          </h3>
          <h4 className="text-virgoolText-600">
            شماره موبایل خود را وارد کنید
          </h4>
          <input
            dir="ltr"
            onChange={(e) => setPhoneInp(e.target.value)}
            value={phoneInp}
            type="text"
            className="outline-none w-full border-b border-zinc-300 py-2"
            placeholder="شماره موبایل خود را وارد کنید"
          />
          {!loading ? (
            <button className="flex text-nowrap vazir-bold w-full mt-2 text-sm items-center justify-center gap-4 bg-virgoolBlue hover:bg-virgoolBlueHover transition rounded-full pr-5 pl-3 py-2 text-white">
              ایجاد حساب کاربری
              <IoIosArrowBack className="text-lg" />
            </button>
          ) : (
            <LoadingBtn fullWidth />
          )}
        </form>
      )}
    </>
  );
}
