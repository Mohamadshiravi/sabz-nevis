import { followUser, UnfollowUser } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast } from "@/utils/toast-functions";
import Image from "next/image";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import PrimaryBtn from "./primaryBtn";
import LoadingBtn from "./loadingBtn";
import { useEffect, useState } from "react";

type UserProps = {
  id: string;
  avatar: string;
  username: string;
  displayName: string | undefined;
  followers: string[];
};

export default function User({
  avatar,
  username,
  displayName,
  id,
  followers,
}: UserProps) {
  const [loading, setLoading] = useState(false);

  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((state) => state.user);

  return (
    <div className="border dark:bg-darkColor-800 dark:border-zinc-800 p-4 border-zinc-200 w-full h-full justify-between bg-white rounded-md flex flex-col items-center">
      <div className="flex flex-col items-center gap-3 w-full">
        <Image
          src={avatar}
          width={500}
          height={500}
          alt="user avatar"
          className="w-[90px] h-[90px] object-cover rounded-full"
        />

        <Link
          href={`/@${username}/profile`}
          className="text-myText-600 text-sm w-full text-center truncate w-full"
        >
          {username}
        </Link>
        <Link
          href={`/@${username}/profile`}
          className="vazir-bold text-lg mt-2 w-full truncate text-center"
        >
          {displayName}
        </Link>
      </div>
      {userData.data?.following.some((e) => e === id) ? (
        <PrimaryBtn onPress={UnFollowUserHandler}>دنبال نکردن</PrimaryBtn>
      ) : (
        <LoadingBtn loading={loading} onPress={FollowUserHandler}>
          دنبال کنید
          <FiPlus className="text-lg" />
        </LoadingBtn>
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
