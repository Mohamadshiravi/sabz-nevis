"use client";

import List from "@/components/module/me/list";
import ListLoading from "@/components/module/skeletonLoadings/list";
import { CategoryModelType } from "@/models/category";
import { ListModelType } from "@/models/list";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchedCategories({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const [data, setData] = useState<null | CategoryModelType[]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/search?type=category&&vord=${searchParams.q}`
      );

      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      SendErrorToast("اتصال خود را بررسی کنید");
    }
  }
  return (
    <section className="flex flex-wrap gap-4 mt-10">
      {loading ? (
        Array.from({ length: 10 }).map((e, i) => (
          <span
            key={i}
            className="bg-zinc-200 rounded-md dark:bg-zinc-800 animate-pulse w-[120px] h-[45px]"
          ></span>
        ))
      ) : data?.length === 0 ? (
        <h3 className="text-sm text-center">موضوعی با این مشخصات پیدا نشد</h3>
      ) : (
        data?.map((e, i) => (
          <span
            key={i}
            className="text-xl px-4 py-1 rounded-md transition cursor-pointer text-center text-myText-800 dark:text-myText-500 border border-myText-800 dark:border-myText-500"
          >
            {e.name}
          </span>
        ))
      )}
    </section>
  );
}
