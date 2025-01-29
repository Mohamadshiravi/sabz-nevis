"use client";

import List from "@/components/module/me/list";
import { useEffect, useState } from "react";
import AddListModal from "./addListModal";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { fetchListFromServer } from "@/redux/slices/list";
import PostLoading from "@/components/module/skeletonLoadings/post";
import ListLoading from "@/components/module/skeletonLoadings/list";

export default function ListsMainSection() {
  const [isAddListmodalOpen, setIsAddListModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchListFromServer());
  }, []);

  const dispatch = useTypedDispatch();

  const { loading, data } = useTypedSelector((state) => state.lists);
  return (
    <>
      <section className="pt-14 pb-20">
        <div className="flex items-center sm:flex-row flex-col sm:gap-0 gap-4 justify-between w-full mt-8">
          <h1 className="vazir-bold text-4xl">لیست‌های شما</h1>

          <button
            onClick={(e) => setIsAddListModalOpen(true)}
            className="flex items-center bg-myGreen-600 hover:bg-myGreen-700 transition text-white px-5 py-1.5 text-sm rounded-full gap-2 vazir-bold"
          >
            ساخت لیست جدید
          </button>
        </div>
        <div className="flex flex-col gap-10 mt-16 sm:px-8 px-0 w-full">
          {loading
            ? Array.from({ length: 6 }).map((e, i) => <ListLoading key={i} />)
            : data?.map((e, i) => <List data={e} key={i} />)}
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
