"use client";

import Post from "@/components/module/post";
import PostLoading from "@/components/module/skeletonLoadings/post";
import { PostModelType } from "@/models/post";
import { SendErrorToast } from "@/utils/toast-functions";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchedPosts({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const [data, setData] = useState<null | PostModelType[]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/search?type=post&&vord=${searchParams.q}`
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
        Array.from({ length: 5 }).map((e, i) => <PostLoading key={i} />)
      ) : data?.length === 0 ? (
        <h3 className="text-sm text-center">پستی با این مشخصات پیدا نشد</h3>
      ) : (
        data?.map((e, i) => (
          <Post isListPost reRenderPosts={FetchData} data={e} key={i} />
        ))
      )}
    </section>
  );
}
