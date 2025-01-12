import { FormEvent, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import LoadingBtn from "@/components/module/loadingBtn";
import VirgoolModal from "@/components/module/virgoolModal";

type RegisterModalProps = {
  value: string;
  CloseModal: () => void;
  OpenVerifyModal: () => void;
  RealTimeInput: (value: string) => void;
};
export default function RegisterModal({
  value,
  CloseModal,
  OpenVerifyModal,
  RealTimeInput,
}: RegisterModalProps) {
  const [phoneInp, setPhoneInp] = useState("");
  const [loading, setLoading] = useState(false);

  const phoneRegex = /^09[0-9]{9}$/;

  useEffect(() => {
    setPhoneInp(value);
  }, []);

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
          CloseModal();
          OpenVerifyModal();
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
  return (
    <VirgoolModal CloseModal={CloseModal}>
      <form
        onSubmit={sendCodeHandler}
        className={`transition sm:px-20 px-8 py-16 flex flex-col gap-2 items-center w-full`}
      >
        <h3 className="text-lg vazir-bold text-myGreen-600">
          ایجاد حساب کاربری
        </h3>
        <h4 className="text-virgoolText-600">شماره موبایل خود را وارد کنید</h4>
        <input
          dir="ltr"
          onChange={(e) => {
            setPhoneInp(e.target.value);
            RealTimeInput(e.target.value);
          }}
          value={phoneInp}
          type="text"
          className="outline-none w-full border-b bg-inherit border-zinc-300 dark:border-zinc-700 py-2 mt-4"
          placeholder="شماره موبایل خود را وارد کنید"
        />

        <LoadingBtn fullWidth loading={loading}>
          ایجاد حساب کاربری
        </LoadingBtn>
      </form>
    </VirgoolModal>
  );
}
