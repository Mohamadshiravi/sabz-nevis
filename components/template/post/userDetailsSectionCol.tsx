"use client";
import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

type UserDetailsSectionCol = {
  avatar: string;
  displayName: string;
  about: string;
  username: string;
  id: string;
  isUserHere: boolean;
};

export default function UserDetailsSectionCol({
  avatar,
  displayName,
  about,
  username,
  id,
  isUserHere,
}: UserDetailsSectionCol) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 sticky top-24">
      <Image
        src={avatar}
        width={800}
        height={800}
        alt={username}
        className="rounded-full w-[100px] h-[100px] object-cover"
      />

      <span className="vazir-bold">{displayName || username}</span>

      <span className="vazir-medium text-myGreen-600 text-sm py-2">
        0 دنبال کننده
      </span>

      <span className="text-sm vazir-light w-[200px] text-myText-600">
        {about || ""}
      </span>

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
