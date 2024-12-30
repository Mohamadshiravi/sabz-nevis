"use client";

import List from "@/components/module/me/list";
import { useState } from "react";
import AddListModal from "./addListModal";

export default function ListsMainSection() {
  const [isAddListmodalOpen, setIsAddListModalOpen] = useState(false);
  return (
    <>
      <section className="pt-14 pb-20">
        <div className="flex items-center sm:flex-row flex-col sm:gap-0 gap-4 justify-between w-full mt-8">
          <h1 className="vazir-bold text-4xl">لیست‌های شما</h1>

          <button
            onClick={(e) => setIsAddListModalOpen(true)}
            className="flex items-center bg-virgoolBlue hover:bg-virgoolBlueHover transition text-white px-5 py-1.5 text-sm rounded-full gap-2 vazir-bold"
          >
            ساخت لیست جدید
          </button>
        </div>
        <div className="flex flex-col gap-10 mt-16 sm:px-8 px-0 w-full">
          <List />
          <List />
        </div>
      </section>
      {isAddListmodalOpen && (
        <AddListModal
          CloseModal={() => {
            setIsAddListModalOpen(false);
          }}
        />
      )}
    </>
  );
}
