"use client";
import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import { followUser, UnfollowUser } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast } from "@/utils/toast-functions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

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

  const router = useRouter();
  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((state) => state.user);

  useEffect(() => {
    setLoading(false);
  }, [userData.data]);

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
    setLoading(true);
    const res = await dispatch(followUser(id));
    if (!res.payload) {
      setLoading(false);
      SendErrorToast("کاربر دنبال نشد");
    } else {
      setLoading(false);
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
