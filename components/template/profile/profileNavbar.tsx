"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNavbar({ username }: { username: string }) {
  const path = usePathname();
  return (
    <div className="flex items-center justify-center gap-8 mt-4 text-sm text-my-text-600 dark:text-my-text-400 vazir-light">
      <Link
        href={`/@${username}/profile`}
        className={`py-2 relative ${
          path === `/@${username}/profile` &&
          "text-black dark:text-white px-2 vazir-regular after:content-[''] after:absolute after:w-full after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-my-text-800 dark:after:bg-white"
        }`}
      >
        پست ها
      </Link>
      <Link
        href={`/@${username}/profile/lists`}
        className={`py-2 relative ${
          path === `/@${username}/profile/lists` &&
          "text-black dark:text-white px-2 vazir-regular after:content-[''] after:absolute after:w-full after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-my-text-800 dark:after:bg-white"
        }`}
      >
        لیست ها
      </Link>
    </div>
  );
}
