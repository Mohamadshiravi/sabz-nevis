"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNavbar({ username }: { username: string }) {
  const path = usePathname();
  return (
    <div className="flex items-center justify-center gap-8 mt-4 text-sm text-myText-600 dark:text-myText-400 vazir-light">
      <Link
        href={`/@${username}`}
        className={`py-2 relative ${
          path === `/@${username}` &&
          "text-black dark:text-white px-2 vazir-regular after:content-[''] after:absolute after:w-full after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-myText-800 dark:after:bg-white"
        }`}
      >
        پست ها
      </Link>
      <Link
        href={`/@${username}/lists`}
        className={`py-2 relative ${
          path === `/@${username}/lists` &&
          "text-black dark:text-white px-2 vazir-regular after:content-[''] after:absolute after:w-full after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-myText-800 dark:after:bg-white"
        }`}
      >
        لیست ها
      </Link>
    </div>
  );
}
