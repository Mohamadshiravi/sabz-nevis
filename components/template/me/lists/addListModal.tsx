import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import SabzModal from "@/components/module/sabzModal";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import { ChangeEvent, useState } from "react";

export default function AddListModal({
  CloseModal,
}: {
  CloseModal: () => void;
}) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  return (
    <SabzModal CloseModal={CloseModal}>
      <form
        onSubmit={AddListHandler}
        className="flex flex-col items-center gap-4 md:px-20 px-4 py-8"
      >
        <h3 className="vazir-bold text-2xl">ایجاد لیست جدید</h3>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="outline-none w-full border-b text-sm border-zinc-300 dark:border-zinc-700 py-2 mt-10 bg-inherit"
          placeholder="نام لیست خود را وارد کنید"
        />
        <div className="flex items-center gap-2 text-sm mt-2 dark:text-myText-400">
          <input
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            type="checkbox"
            className="bg-zinc-800"
          />
          <label htmlFor="locked">
            این لیست توسط سایر افراد قابل دیدن نباشد
          </label>
        </div>
        <div className="flex items-center justify-center gap-3 mt-10 w-full">
          <PrimaryBtn onPress={CloseModal}>منصرف شدم</PrimaryBtn>
          <LoadingBtn loading={loading} isDisable={name === "" ? true : false}>
            ایجاد لیست جدید
          </LoadingBtn>
        </div>
      </form>
    </SabzModal>
  );
  async function AddListHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/list", {
        name,
        status: status ? "public" : "private",
      });

      console.log(res);

      SendSucToast("لیست ساخته شد");
    } catch (error) {
      SendErrorToast("لیست ساخته نشد");
      setLoading(false);
    }
  }
}
