"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FirstLoading() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  return (
    <section className="w-full h-screen fixed top-0 left-0 bg-white flex flex-col items-center justify-center text-zinc-800 sm:text-3xl text-2xl">
      <h2 className="text-center vazir-bold">
        در حال انتقال شما به سایت هستیم ...
      </h2>
      <img src="/images/loader-guy.gif" className="" alt="loader" />
    </section>
  );
}
