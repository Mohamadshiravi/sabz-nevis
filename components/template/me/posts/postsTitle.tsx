"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import { useRouter } from "next/navigation";

export default function PostsTitle() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mt-20">
      <h1 className="vazir-bold sm:text-4xl text-3xl">پست های شما</h1>
      <LoadingBtn
        width="sm:w-[200px] w-[130px]"
        onPress={() => {
          localStorage.removeItem("postId");
          router.push("/post/create");
        }}
      >
        نوشتن پست جدید
      </LoadingBtn>
    </div>
  );
}
