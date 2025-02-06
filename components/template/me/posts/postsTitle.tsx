"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import { useRouter } from "next/navigation";

export default function PostsTitle() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mt-20">
      <h1 className="vazir-bold text-4xl">پست های شما</h1>
      <LoadingBtn
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
