import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import PrimaryLoadingBtn from "@/components/module/primaryLoadingBtn";
import SabzModal from "@/components/module/sabzModal";
import { UserModelType } from "@/models/user";
import { followUser, UnfollowUser } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function AdminPanelUserField({
  data,
  reRenderUsers,
}: {
  data: UserModelType;
  reRenderUsers?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);

  const { data: user, loading: usersLoading } = useTypedSelector(
    (state) => state.user
  );

  const dispatch = useTypedDispatch();
  return (
    <>
      <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800 p-4 rounded-md">
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <Image
            src={data.avatar}
            alt="user avatar"
            width={400}
            height={400}
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <div className="flex flex-col items-center gap-1">
            <span>{data.displayName || data.username}</span>
            <span className="text-zinc-500 text-sm">
              {data.role === "user" ? "کاربر عادی" : "ادمین"}
            </span>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-2">
          <div className="flex flex-col gap-2">
            {data._id === user?._id ? (
              <button></button>
            ) : user?.following.some((e) => e === data._id) ? (
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
            <PrimaryLoadingBtn
              width="w-[150px]"
              onPress={() => setIsModalOpen(true)}
            >
              حذف کردن
            </PrimaryLoadingBtn>
          </div>

          <div className="flex flex-col gap-2">
            {data.role === "user" ? (
              <PrimaryLoadingBtn
                width="w-[150px]"
                onPress={() => setIsAdminModalOpen(true)}
              >
                ادمین کردن
              </PrimaryLoadingBtn>
            ) : (
              <PrimaryLoadingBtn
                width="w-[150px]"
                onPress={() => setIsAdminModalOpen(true)}
              >
                برکنار کردن ادمین
              </PrimaryLoadingBtn>
            )}
            <PrimaryLoadingBtn
              width="w-[150px]"
              onPress={() => setIsBanModalOpen(true)}
            >
              بن کردن
            </PrimaryLoadingBtn>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SabzModal
          CloseModal={() => {
            setIsModalOpen(false);
          }}
        >
          <form onSubmit={DeleteUserHandler} className="w-full p-6">
            <h3 className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center">
              ایا میخاهید کاربر را حذف کنید ؟
            </h3>
            <h4 className="dark:border-zinc-800 text-center text-sm mt-6">
              با این کار تمام اطلاعات کاربر و پست هایش به طور کامل از دیتابیس
              پاک خواهد شد و امکان بازگشت وجود ندارد
            </h4>
            <div className="flex items-center justify-center gap-4 mt-28">
              <LoadingBtn width={"w-[150px]"} loading={loading}>
                بله
              </LoadingBtn>
              <PrimaryBtn
                onPress={() => setIsModalOpen(false)}
                width="w-[150px]"
              >
                منصرف شدم
              </PrimaryBtn>
            </div>
          </form>
        </SabzModal>
      )}
      {isBanModalOpen && (
        <SabzModal
          CloseModal={() => {
            setIsBanModalOpen(false);
          }}
        >
          <form onSubmit={BanUserHandler} className="w-full p-6">
            <h3 className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center">
              ایا میخاهید کاربر را بن کنید ؟
            </h3>
            <h4 className="dark:border-zinc-800 text-center text-sm mt-6">
              با این کار تمام اطلاعات کاربر و پست هایش به طور کامل از دیتابیس
              پاک خواهد شد و امکان ساخت اکانت مجدد وجود ندارد
            </h4>
            <div className="flex items-center justify-center gap-4 mt-28">
              <LoadingBtn width={"w-[150px]"} loading={loading}>
                بله
              </LoadingBtn>
              <PrimaryBtn
                onPress={() => setIsModalOpen(false)}
                width="w-[150px]"
              >
                منصرف شدم
              </PrimaryBtn>
            </div>
          </form>
        </SabzModal>
      )}
      {isAdminModalOpen && (
        <SabzModal
          CloseModal={() => {
            setIsAdminModalOpen(false);
          }}
        >
          <form onSubmit={ToggleUserRoleHandler} className="w-full p-6">
            <h3 className="border-b border-zinc-200 dark:border-zinc-800 pb-6 text-center">
              ایا میخاهید کاربر را ادمین کنید ؟
            </h3>
            <h4 className="dark:border-zinc-800 text-center text-sm mt-6">
              با این کار کاربر به پنل ادمین و تمام تنظیمات سایت دسترسی خواهد
              داشت !
            </h4>
            <div className="flex items-center justify-center gap-4 mt-28">
              <LoadingBtn width={"w-[150px]"} loading={loading}>
                بله
              </LoadingBtn>
              <PrimaryBtn
                onPress={() => setIsModalOpen(false)}
                width="w-[150px]"
              >
                منصرف شدم
              </PrimaryBtn>
            </div>
          </form>
        </SabzModal>
      )}
    </>
  );
  async function FollowUserHandler() {
    if (user) {
      setLoading(true);
      const res = await dispatch(followUser(data._id));
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
      const res = await dispatch(UnfollowUser(data._id));
      if (!res.payload) {
        setLoading(false);
        SendErrorToast("کاربر انفالو نشد");
      } else {
        setLoading(false);
      }
    }
  }
  async function DeleteUserHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.delete(`/api/users/${data._id}`);
      SendSucToast("کاربر حذف شد");
      setLoading(false);
      if (reRenderUsers) {
        reRenderUsers();
      }
      setIsModalOpen(false);
    } catch (error) {
      SendErrorToast("کاربر حذف نشد");
      setLoading(false);
    }
  }
  async function ToggleUserRoleHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`/api/user/admin/${data._id}`);
      SendSucToast("نقش کاربر تغییر کرد");
      setLoading(false);
      if (reRenderUsers) {
        reRenderUsers();
      }
      setIsAdminModalOpen(false);
    } catch (error) {
      SendErrorToast("مشکلی پیش امد");
      setLoading(false);
    }
  }
  async function BanUserHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`/api/user/ban/${data._id}`);
      SendSucToast("کاربر بن شد");
      setLoading(false);
      if (reRenderUsers) {
        reRenderUsers();
      }
      setIsAdminModalOpen(false);
    } catch (error) {
      SendErrorToast("مشکلی پیش امد");
      setLoading(false);
    }
  }
}
