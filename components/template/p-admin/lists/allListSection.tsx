"use client";

import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListModelType } from "@/models/list";
import List from "@/components/module/me/list";
import ListLoading from "@/components/module/skeletonLoadings/list";
import AdminPanelList from "./adminPanelList";

export default function AllListsSection() {
  const [lists, setLists] = useState<[] | ListModelType[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="mt-4 sm:p-10 p-0 flex flex-col gap-3">
      {loading ? (
        Array.from({ length: 4 }).map((e, i) => <ListLoading />)
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
