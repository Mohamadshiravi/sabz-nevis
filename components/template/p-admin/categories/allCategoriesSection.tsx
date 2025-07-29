"use client";

import { PostModelType } from "@/models/post";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import AdminPanelPosts from "../posts/adminPanelPosts";
import Link from "next/link";
import { CategoryModelType } from "@/models/category";
import LoadingBtn from "@/components/module/loadingBtn";
import AdminPanelCategory from "./adminPanelCategory";

export default function AllCategoriesSection() {
  const [categories, setCategories] = useState<[] | CategoryModelType[]>([]);
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState("");

  useEffect(() => {
    FetchAllCategories();
  }, []);

  async function FetchAllCategories() {
    setLoading(true);
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data.categories);
      setLoading(false);
    } catch (error) {
      SendErrorToast("مشکلی در هنگام دریافت موضوع ها پیش امد");
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 sm:p-10 p-0 flex flex-col gap-3">
      <form
        onSubmit={AddCategoryHandler}
        className="flex flex-col items-end gap-3"
      >
        <div className="flex items-center gap-3 border-2 text-base w-full vazir-light rounded-md px-3 py-3 border-zinc-200 dark:border-zinc-800">
          <IoIosSearch className="text-2xl text-zinc-500" />
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="افزودن موضوع جدید"
            type="text"
            className="w-full bg-inherit outline-hidden"
          />
        </div>
        <LoadingBtn>افزودن</LoadingBtn>
      </form>

      <div className="mt-6 py-6 sm:px-6 px-0 flex flex-wrap gap-4 border-t border-zinc-300 dark:border-zinc-700">
        {loading
          ? Array.from({ length: 30 }).map((e, i) => (
              <div
                key={i}
                className="bg-zinc-200 rounded-md dark:bg-zinc-800 animate-pulse w-[110px] grow h-[45px]"
              ></div>
            ))
          : categories?.map((e, i) => (
              <AdminPanelCategory
                key={i}
                data={e}
                reRender={FetchAllCategories}
              />
            ))}
      </div>
    </div>
  );
  async function AddCategoryHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (value !== "") {
      try {
        const res = await axios.post("/api/category", { name: value });
        SendSucToast("موضوع جدید اضافه شد");
        FetchAllCategories();
        setValue("");
      } catch (error) {
        SendErrorToast("مشکلی پیش امد");
      }
    }
  }
}
