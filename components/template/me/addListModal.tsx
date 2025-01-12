import PrimaryBtn from "@/components/module/primaryBtn";
import VirgoolModal from "@/components/module/virgoolModal";
import { useState } from "react";

export default function AddListModal({
  CloseModal,
}: {
  CloseModal: () => void;
}) {
  const [isValueValid, setIsValueValid] = useState(false);
  return (
    <VirgoolModal CloseModal={CloseModal}>
      <form className="flex flex-col items-center gap-4 md:px-20 px-4 py-8">
        <h3 className="vazir-bold text-2xl">ایجاد لیست جدید</h3>
        <input
          type="text"
          className="outline-none w-full border-b text-sm border-zinc-300 dark:border-zinc-700 py-2 mt-10 bg-inherit"
          placeholder="نام لیست خود را وارد کنید"
        />
        <input
          type="text"
          className="outline-none w-full border-b text-sm border-zinc-300 dark:border-zinc-700 py-2 bg-inherit"
          placeholder="توضیحات ..."
        />
        <div className="flex items-center gap-2 text-sm mt-2 dark:text-virgoolText-400">
          <input id="locked" type="checkbox" className="bg-zinc-800" />
          <label htmlFor="locked">
            این لیست توسط سایر افراد قابل دیدن نباشد
          </label>
        </div>
        <div className="flex items-center gap-3 mt-10">
          <PrimaryBtn onPress={CloseModal}>منصرف شدم</PrimaryBtn>
          <button
            disabled={!isValueValid}
            className={`${
              isValueValid ? "opacity-100" : "opacity-40"
            } flex items-center bg-myGreen-600 hover:bg-myGreen-700 transition text-white px-5 py-1.5 text-sm rounded-full gap-2 vazir-bold`}
          >
            ایجاد لیست جدید
          </button>
        </div>
      </form>
    </VirgoolModal>
  );
}
