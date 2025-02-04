"use client";

import UserFiled from "@/components/template/profile/user";
import { UserModelType } from "@/models/user";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchedUsersSection() {
  const [data, setData] = useState<null | UserModelType[]>(null);
  const [loading, setLoading] = useState(true);
  const searchParam = useSearchParams().get("q");

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/search?type=users&&vord=${searchParam}`
      );

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
        Array.from({ length: 5 }).map((e, i) => (
          <div key={i} className="flex items-center justify-between py-4">
            <div className="flex sm:flex-row flex-col items-center gap-4">
              <div className="w-[60px] h-[60px] rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="w-[120px] h-[30px] bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
            <div className="w-[150px] h-[40px] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          </div>
        ))
      ) : data?.length === 0 ? (
        <h3 className="text-sm text-center">کاربری با این مشخصات پیدا نشد</h3>
      ) : (
        data?.map((e, i) => (
          <UserFiled
            key={i}
            userId={e._id}
            username={e.username}
            displayName={e.displayName}
            avatar={e.avatar}
          />
        ))
      )}
    </section>
  );
}
