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
        className={`transition sm:px-20 px-8 py-16 flex flex-col gap-1 items-center w-full`}
      >
        <h3 className="text-lg vazir-bold text-virgoolBlue">
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
          className="outline-none w-full border-b border-zinc-300 py-2 mt-2"
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
    </VirgoolModal>
  );
}
