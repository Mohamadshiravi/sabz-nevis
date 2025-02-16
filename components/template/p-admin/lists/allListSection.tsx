"use client";

import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListModelType } from "@/models/list";
import ListLoading from "@/components/module/skeletonLoadings/list";
import AdminPanelList from "./adminPanelList";
import { IoIosSearch } from "react-icons/io";

export default function AllListsSection() {
  const [lists, setLists] = useState<[] | ListModelType[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchInp, setsearchInp] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInp !== "") {
        FetchSearchedPostsLists();
      }
    }, 800);

    if (searchInp === "") {
      FetchAllLists();
    }

    return () => clearTimeout(timer);
  }, [searchInp]);

  useEffect(() => {
    FetchAllLists();
  }, []);

  async function FetchAllLists() {
    setLoading(true);
    try {
      const res = await axios.get("/api/list/all");

      setLists(res.data.lists);
      setLoading(false);
    } catch (error) {
      SendErrorToast("مشکلی در هنگام دریافت لیست ها پیش امد");
      setLoading(false);
    }
  }

  async function FetchSearchedPostsLists() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/search?type=lists&&vord=${searchInp}`);

      setLists(res.data.data);
      setLoading(false);
    } catch (error) {
      SendErrorToast("مشکلی در هنگام دریافت لیست ها پیش امد");
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 sm:p-10 p-0 flex flex-col gap-3">
      <div className="flex items-center gap-3 border-2 text-base vazir-light rounded-md px-3 py-3 border-zinc-200 dark:border-zinc-800">
        <IoIosSearch className="text-2xl text-zinc-500" />
        <input
          onChange={(e) => setsearchInp(e.target.value)}
          value={searchInp}
          placeholder="جستجو در لیست ها"
          type="text"
          className="w-full bg-inherit outline-none"
        />
      </div>
      {loading ? (
        Array.from({ length: 4 }).map((e, i) => <ListLoading key={i} />)
      ) : lists.length === 0 ? (
        <div>لیستی موجود نیست</div>
      ) : (
        lists?.map((e, i) => (
          <AdminPanelList reRenderLists={FetchAllLists} key={i} data={e} />
        ))
      )}
    </div>
  );
}
