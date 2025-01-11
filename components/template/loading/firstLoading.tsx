"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FirstLoading() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  return (
    <section className="w-full h-screen fixed top-0 left-0 bg-white flex items-center justify-center text-zinc-800 text-3xl">
      <h2>در حال بررسی مرورگر، پیش از انتقال به سایت هستیم ...</h2>
    </section>
  );
}
