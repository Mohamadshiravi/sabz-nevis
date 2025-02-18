"use client";

import { useTypedSelector } from "@/redux/typedHooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GoToAdminPanel() {
  const { data, loading } = useTypedSelector((state) => state.user);
  const path = usePathname();

  const regex = /^\/p-admin(\/.*)?$/;
  return (
    !regex.test(path) &&
    !loading &&
    data &&
    data?.role === "admin" && (
      <Link
        href={"/p-admin"}
        className="fixed lg:bottom-2 z-40 bottom-16 left-2 bg-zinc-200 dark:bg-zinc-800 px-4 py-2 rounded-md shadow-lg"
      >
        رفتن به پنل ادمین
      </Link>
    )
  );
}
