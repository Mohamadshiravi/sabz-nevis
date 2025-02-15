import LoadingBtn from "@/components/module/loadingBtn";
import PrimaryBtn from "@/components/module/primaryBtn";
import {
  addAvatarToServer,
  fetchUserDataFromServer,
} from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { toast } from "react-toastify";

export default function AddDisplayNameForm() {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useTypedDispatch();

  const userAvatar = useTypedSelector((state) => state.user.data?.avatar);

  useEffect(() => {
    dispatch(fetchUserDataFromServer());
  }, []);

  return (
    <section className="lg:w-[3000px] w-full bg-white h-full flex lg:items-center lg:mt-0 mt-8 justify-center">
      <form
        onSubmit={setDisplayNameHandler}
        className="flex flex-col items-center gap-3 sm:w-[500px] sm:px-0 px-4 w-full"
      >
        <label className="relative w-[200px] h-[200px] rounded-full group">
          <input
            accept="image/*"
            onChange={AddAvatarHandler}
            type="file"
            className="w-0 h-0 absolute top-[1000px]"
          />
          <Image
            src={userAvatar || "/images/guest-avatar.webp"}
            width={1000}
            height={1000}
            alt="guest"
            className="w-full h-full rounded-full"
          />
          <div className="bg-black/40 group-hover:opacity-100 transition duration-300 opacity-0 cursor-pointer rounded-full w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <MdPhotoCamera className="text-zinc-300 text-7xl" />
          </div>
        </label>

        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          className="InpShadow mt-10 w-full outline-none border px-4 border-zinc-200 py-3 rounded-full shadow-md"
          placeholder="نام و نام خانوادگی "
        />
        <div className="flex items-center gap-4 justify-between w-full">
          <PrimaryBtn
            onPress={() => {
              location.href = "/home";
            }}
          >
            رد کردن این مرحله
          </PrimaryBtn>
          <LoadingBtn fullWidth loading={loading}>
            ذخیره
          </LoadingBtn>
        </div>
      </form>
    </section>
  );
  async function AddAvatarHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const fileSizeInMB = e.target.files[0].size / (1024 * 1024); //to MB

      const id = toast.loading("در حال اپلود عکس ...");

      if (fileSizeInMB < 5) {
        const formData = new FormData();
        formData.append("img", e.target.files[0]);

        const res = await dispatch(addAvatarToServer(formData));
        if (res.payload) {
          toast.update(id, {
            render: "عکس پروفایل شما با موفقیت تغییر کرد",
            type: "success",
            isLoading: false,
            autoClose: 4000,
            theme: "colored",
          });
        } else {
          toast.update(id, {
            render: "عکس پروفایل شما تغییر نکرد",
            type: "error",
            isLoading: false,
            autoClose: 4000,
            theme: "colored",
          });
        }
      } else {
        SendErrorToast("حجم عکس نباید بیشتر از پنج مگابایت باشد");
      }
    }
  }
  async function setDisplayNameHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (displayName !== "") {
        const res = await axios.post("/api/auth/me/update", { displayName });
        if (res.status === 200) {
          SendSucToast("اطلاعات شما با موفقیت وارد شد");
          setLoading(false);
          location.href = "/home";
        }
      } else {
        setLoading(false);
        SendErrorToast("یک نام درست وارد کنید");
      }
    } catch (error) {
      SendErrorToast("مشکلی پیش امده است");
      setLoading(false);
    }
  }
}
