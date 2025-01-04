import LoadingBtn from "@/components/module/loadingBtn";
import VirgoolModal from "@/components/module/virgoolModal";
import { updateUserDataToServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import { FormEvent, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function AboutField({ about }: { about?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(about);
  }, []);

  async function UpdateHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (value !== about && value !== "") {
      if (value?.length! < 200) {
        const res = await dispatch(updateUserDataToServer({ about: value }));
        if (res.payload) {
          SendSucToast("درباره  شما تغییر کرد");
          setLoading(false);
          setIsModalOpen(false);
        } else {
          SendErrorToast("مشکلی پیش امد");
          setLoading(false);
        }
      } else {
        setLoading(false);
        SendErrorToast("درباره من شما بیشتر از 200 کرکتر شد");
      }
    } else {
      SendErrorToast("یک درباره جدید و حدئقل چند کرکتر وارد کنید");
      setLoading(false);
    }
  }

  const dispatch = useTypedDispatch();
  return (
    <>
      <div
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <div className="flex flex-col gap-2">
          <h3 className="vazir-medium">درباره شما</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            بیوگرافی شما در صفحه پروفایل نمایش داده می شود. حداکثر ۲۰۰ کاراکتر
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <FaEdit className="text-xl" />
        </div>
      </div>
      {isModalOpen && (
        <VirgoolModal CloseModal={() => setIsModalOpen(false)}>
          <form onSubmit={UpdateHandler} className="w-full bg-white p-4">
            <h3 className="vazir-bold text-lg border-b border-zinc-200 py-2">
              درباره شما
            </h3>
            <textarea
              placeholder="درباره خود بنویسید"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="border-b border-zinc-300 w-full px-2 py-1 outline-none mt-10 max-h-[300px] min-h-[100px]"
            />
            <div className="flex items-center justify-end gap-3 mt-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm vazir-medium hover:bg-zinc-800 hover:text-white transition w-[110px] py-1.5 border-2 border-zinc-800 rounded-full"
              >
                منصرف شدم
              </button>
              <LoadingBtn loading={loading} width="w-[90px]">
                ذخیره
              </LoadingBtn>
            </div>
          </form>
        </VirgoolModal>
      )}
    </>
  );
}
