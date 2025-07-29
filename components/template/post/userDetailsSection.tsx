"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import { followUser, UnfollowUser } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast } from "@/utils/toast-functions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

type UserDetailsSection = {
  avatar: string;
  displayName: string;
  about: string;
  username: string;
  id: string;
  isUserHere: boolean;
  followers: string[];
};

export default function UserDetailsSection({
  avatar,
  displayName,
  about,
  username,
  id,
  isUserHere,
  followers,
}: UserDetailsSection) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((state) => state.user);

  useEffect(() => {
    setLoading(false);
  }, [userData.data]);

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
        <span className="text-sm vazir-light sm:w-[400px] text-my-text-600">
          {about || ""}
        </span>
      </div>
      {!loading ? (
        isUserHere ? (
          <PrimaryBtn onPress={() => router.push("/me/settings")}>
            تنظیمات حساب کاربری
          </PrimaryBtn>
        ) : userData.data?.following.some((e) => e === id) ? (
          <PrimaryBtn onPress={UnFollowUserHandler}>دنبال نکردن</PrimaryBtn>
        ) : (
          <LoadingBtn
            icon={<FiPlus className="text-lg" />}
            loading={loading}
            onPress={FollowUserHandler}
          >
            دنبال کنید
          </LoadingBtn>
        )
      ) : (
        <div className="lg:w-[180px] w-full h-[35px] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
      )}
    </div>
  );
  async function FollowUserHandler() {
    if (userData.data) {
      setLoading(true);
      const res = await dispatch(followUser(id));
      if (!res.payload) {
        setLoading(false);
        SendErrorToast("کاربر دنبال نشد");
      } else {
        setLoading(false);
      }
    } else {
      SendErrorToast("لطفا وارد اکانت خود شوید");
    }
  }
  async function UnFollowUserHandler() {
    if (!loading) {
      setLoading(true);
      const res = await dispatch(UnfollowUser(id));
      if (!res.payload) {
        setLoading(false);
        SendErrorToast("کاربر انفالو نشد");
      } else {
        setLoading(false);
      }
    }
  }
}
