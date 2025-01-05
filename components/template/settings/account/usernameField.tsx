import LoadingBtn from "@/components/module/loadingBtn";
import VirgoolModal from "@/components/module/virgoolModal";
import { updateUserDataToServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toastFunctions";
import { FormEvent, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function UsernameFiled({ username }: { username?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const regex = /^[a-zA-Z0-9_]+$/;

  useEffect(() => {
    setValue(username || "");
  }, []);

  async function UpdateHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (value !== username && value !== "" && regex.test(value)) {
      const res = await dispatch(updateUserDataToServer({ username: value }));
      if (res.payload) {
        SendSucToast("نام کاربری شما تغییر کرد");
        setLoading(false);
        setIsModalOpen(false);
      } else {
        SendErrorToast("مشکلی پیش امد");
        setLoading(false);
      }
    } else {
      SendErrorToast("یک نام کاربری جدید با حروف انگلیسی وارد کنید");
      setLoading(false);
    }
  }

  const dispatch = useTypedDispatch();
  return (
    <>
      <div
        onClick={(e) => setIsModalOpen(true)}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <h3 className="vazir-medium">نام کاربری</h3>
        <div className="flex items-center gap-2">
          <span>{username}</span>
          <FaEdit className="text-xl" />
        </div>
      </div>
      {isModalOpen && (
        <VirgoolModal CloseModal={() => setIsModalOpen(false)}>
          <form onSubmit={UpdateHandler} className="w-full bg-white p-4">
            <h3 className="vazir-bold text-lg border-b border-zinc-200 py-2">
              نام کاربری
            </h3>
            <input
              placeholder="نام کاربری خود را وارد کنید"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
              className="border-b border-zinc-300 w-full px-2 py-1 outline-none mt-10"
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
