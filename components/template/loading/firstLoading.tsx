"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FirstLoading() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  return (
    <section className="w-full h-screen fixed top-0 left-0 bg-white flex items-center justify-center text-zinc-800 sm:text-3xl text-2xl">
      <h2 className="text-center">
        در حال بررسی مرورگر، پیش از انتقال به سایت هستیم ...
      </h2>
    </section>
  );
}
