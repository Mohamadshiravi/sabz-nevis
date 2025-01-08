"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function FollowBtn({ isUserHere }: { isUserHere: boolean }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return !loading ? (
    !isUserHere ? (
      <button className="text-sm flex items-center gap-4 mt-4 px-16 py-1.5 transition vazir-bold bg-virgoolBlue hover:bg-virgoolBlueHover rounded-full text-white">
        دنبال کنید
        <FaPlus />
      </button>
    ) : (
      <Link
        href={"/me/settings"}
        className="text-sm mt-4 vazir-bold hover:bg-zinc-700 hover:text-white transition px-16 py-1.5 border-2 border-zinc-700 text-zinc-700 dark:border-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-800 rounded-full"
      >
        تنظیمات حساب کاربری
      </Link>
    )
  ) : (
    <div className="w-[250px] h-[35px] rounded-full bg-zinc-200 dark:bg-zinc-800 mt-4"></div>
  );
}
