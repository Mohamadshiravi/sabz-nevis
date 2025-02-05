"use client";

import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import { followUser, UnfollowUser } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast } from "@/utils/toast-functions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function FollowBtn({
  isUserHere,
  id,
}: {
  isUserHere: boolean;
  id: string;
}) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((state) => state.user);

  useEffect(() => {
    setLoading(false);
  }, [userData.data]);

  return (
    <div className="mt-4 w-[300px]">
      {!loading ? (
        isUserHere ? (
          <PrimaryBtn
            width="w-full"
            onPress={() => router.push("/me/settings")}
          >
            تنظیمات حساب کاربری
          </PrimaryBtn>
        ) : userData.data?.following.some((e) => e === id) ? (
          <PrimaryBtn width="w-full" onPress={UnFollowUserHandler}>
            دنبال نکردن
          </PrimaryBtn>
        ) : (
          <LoadingBtn
            fullWidth
            icon={<FiPlus className="text-lg" />}
            loading={loading}
            onPress={FollowUserHandler}
          >
            دنبال کنید
          </LoadingBtn>
        )
      ) : (
        <div className="w-full h-[35px] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
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
