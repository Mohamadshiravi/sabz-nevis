"use client";

import List from "@/components/module/me/list";
import ListLoading from "@/components/module/skeletonLoadings/list";
import { ListModelType } from "@/models/list";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchedLists({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const [data, setData] = useState<null | ListModelType[]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/search?type=lists&&vord=${searchParams.q}`
      );

      console.log(res);

      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      SendErrorToast("اتصال خود را بررسی کنید");
    }
  }
  return (
    <section className="flex flex-col gap-4 mt-10">
      {loading ? (
        Array.from({ length: 5 }).map((e, i) => <ListLoading key={i} />)
      ) : data?.length === 0 ? (
        <h3 className="text-sm text-center">لیستی با این مشخصات پیدا نشد</h3>
      ) : (
        data?.map((e, i) => <List data={e} key={i} />)
      )}
    </section>
  );
}
