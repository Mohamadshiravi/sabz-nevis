import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import SabzModal from "@/components/module/sabzModal";
import { updateUserDataToServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import { FormEvent, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function EmailField({ email }: { email?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    setValue(email || "");
  }, []);

  async function UpdateHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (value !== email && value !== "" && regex.test(value)) {
      const res = await dispatch(updateUserDataToServer({ email: value }));
      if (res.payload) {
        SendSucToast(" ایمیل شما تغییر کرد");
        setLoading(false);
        setIsModalOpen(false);
      } else {
        SendErrorToast("مشکلی پیش امد");
        setLoading(false);
      }
    } else {
      SendErrorToast("یک ایمیل معتبر و غیر تکراری وارد کنید");
      setLoading(false);
    }
  }

  const dispatch = useTypedDispatch();
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <h3 className="vazir-medium">ایمیل</h3>
        <div className="flex items-center gap-2">
          <span>{email || "ثبت نشده"}</span>
          <FaEdit className="text-xl" />
        </div>
      </div>
      {isModalOpen && (
        <SabzModal CloseModal={() => setIsModalOpen(false)}>
          <form onSubmit={UpdateHandler} className="w-full p-4">
            <h3 className="vazir-bold text-lg border-b border-zinc-200 dark:border-zinc-800 py-2">
              ایمیل
            </h3>
            <input
              placeholder=" ایمیل خود را وارد کنید"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
              className="border-b border-zinc-300 bg-inherit dark:border-zinc-700 w-full px-2 py-1 outline-none mt-10"
            />
            <div className="flex items-center justify-end gap-3 mt-10">
              <PrimaryBtn onPress={() => setIsModalOpen(false)}>
                منصرف شدم
              </PrimaryBtn>
              <LoadingBtn loading={loading} width="w-[90px]">
                ذخیره
              </LoadingBtn>
            </div>
          </form>
        </SabzModal>
      )}
    </>
  );
}
