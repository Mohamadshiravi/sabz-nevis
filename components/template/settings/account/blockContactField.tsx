import VirgoolModal from "@/components/module/virgoolModal";
import { useState } from "react";

export default function BlockContactField() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-between w-full cursor-pointer"
      >
        <div className="flex flex-col gap-2">
          <h3 className="vazir-medium">مدیریت کاربران بلاک شده</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            مشاهده لیست افرادی که بلاک کرده‌اید
          </h4>
        </div>
      </div>
      {isModalOpen && (
        <VirgoolModal CloseModal={() => setIsModalOpen(false)}>
          <form className="w-full p-4">
            <h3 className="vazir-bold text-lg border-b border-zinc-200 dark:border-zinc-800 py-2">
              مدیریت کاربران بلاک شده
            </h3>
            <h4 className="mt-4">شما هیچ کاربری را بلاک نکرده‌اید.</h4>
          </form>
        </VirgoolModal>
      )}
    </>
  );
}
