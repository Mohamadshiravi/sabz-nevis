"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

type UserDetailsSection = {
  avatar: string;
  displayName: string;
  about: string;
  username: string;
  id: string;
  isUserHere: boolean;
};

export default function UserDetailsSection({
  avatar,
  displayName,
  about,
  username,
  id,
  isUserHere,
}: UserDetailsSection) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  const router = useRouter();
  return (
    <div className="flex md:flex-row flex-col gap-5 justify-between py-8 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={avatar}
            width={400}
            height={400}
            alt={username}
            className="rounded-full w-[40px] h-[40px] object-cover"
          />

          <span className="vazir-bold">{displayName || username}</span>
        </div>
        <span className="text-sm vazir-light sm:w-[400px] text-myText-600">
          {about || ""}
        </span>
      </div>
      {!loading ? (
        isUserHere ? (
          <PrimaryBtn onPress={() => router.push("/me/settings")}>
            تنظیمات حساب کاربری
          </PrimaryBtn>
        ) : (
          <LoadingBtn loading={false} icon={<FaPlus />}>
            دنبال کردن
          </LoadingBtn>
        )
      ) : (
        <div className="lg:w-[180px] w-full h-[35px] bg-zinc-100 dark:bg-zinc-800 rounded-full"></div>
      )}
    </div>
  );
}
