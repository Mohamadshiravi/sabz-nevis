import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import { followUser, UnfollowUser } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast } from "@/utils/toast-functions";
import Image from "next/image";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function UserField({
  username,
  displayName,
  avatar,
  userId,
}: {
  username: string;
  displayName: string | undefined;
  avatar: string;
  userId: string;
}) {
  const [loading, setLoading] = useState(false);
  const { data, loading: usersLoading } = useTypedSelector(
    (state) => state.user
  );

  const dispatch = useTypedDispatch();
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 py-4">
      <div className="flex sm:flex-row flex-col items-center gap-4">
        <Image
          src={avatar}
          alt="user avatar"
          width={400}
          height={400}
          className="w-[60px] h-[60px] rounded-full object-cover"
        />
        <span>{displayName || username}</span>
      </div>
      {userId === data?._id ? (
        <button></button>
      ) : data?.following.some((e) => e === userId) ? (
        <PrimaryBtn width="w-[150px]" onPress={UnFollowUserHandler}>
          دنبال نکردن
        </PrimaryBtn>
      ) : (
        <LoadingBtn
          width="w-[150px]"
          loading={loading}
          onPress={FollowUserHandler}
        >
          دنبال کنید
          <FiPlus className="text-lg" />
        </LoadingBtn>
      )}
    </div>
  );
  async function FollowUserHandler() {
    if (data) {
      setLoading(true);
      const res = await dispatch(followUser(userId));
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
      const res = await dispatch(UnfollowUser(userId));
      if (!res.payload) {
        setLoading(false);
        SendErrorToast("کاربر انفالو نشد");
      } else {
        setLoading(false);
      }
    }
  }
}
