"use client";

import { CategoryModelType } from "@/models/category";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchedCategoriesSection() {
  const searchParam = useSearchParams().get("q");
  const [data, setData] = useState<null | CategoryModelType[]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/search?type=category&&vord=${searchParam}`
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
          <Link
            href={`/category/${e._id}`}
            key={i}
            className="text-xl px-4 py-1 rounded-md transition cursor-pointer text-center text-myText-800 dark:text-myText-500 border border-myText-800 dark:border-myText-500"
          >
            {e.name}
          </Link>
        ))
      )}
    </section>
  );
}
