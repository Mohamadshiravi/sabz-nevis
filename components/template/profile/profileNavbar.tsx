"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNavbar({ username }: { username: string }) {
  const path = usePathname();
  return (
    <div className="flex items-center justify-center gap-6 mt-4 text-sm text-virgoolText-600 dark:text-virgoolText-400 vazir-light">
      <Link
        href={`/@${username}`}
        className={`py-2 relative ${
          path === `/@${username}` &&
          "text-black dark:text-white vazir-regular after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1.5px] after:bg-virgoolText-800 dark:after:bg-white"
        }`}
      >
        پست ها
      </Link>
      <Link
        href={`/@${username}/lists`}
        className={`py-2 relative ${
          path === `/@${username}/lists` &&
          "text-black dark:text-white vazir-regular after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1.5px] after:bg-virgoolText-800 dark:after:bg-white"
        }`}
      >
        لیست ها
      </Link>
      <Link
        href={`/@${username}/publications`}
        className={`py-2 relative ${
          path === `/@${username}/publications` &&
          "text-black dark:text-white vazir-regular after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1.5px] after:bg-virgoolText-800 dark:after:bg-white"
        }`}
      >
        انتشارات
      </Link>
    </div>
  );
}
