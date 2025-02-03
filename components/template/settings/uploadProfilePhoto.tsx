import { addAvatarToServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typedHooks";
import { SendErrorToast, SendSucToast } from "@/utils/toast-functions";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { toast } from "react-toastify";

export default function UploadProfilePhoto({
  avatar,
}: {
  avatar: string | undefined;
}) {
  const dispatch = useTypedDispatch();
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-2">
        <h3 className="vazir-medium">عکس پروفایل</h3>
        <h4 className="text-myText-600 text-sm pl-2">
          عکس شما در صفحه پروفایل و پست‌ها نمایش داده می‌شود.
        </h4>
      </div>
      <label className="relative w-[60px] h-[60px] group">
        <input
          accept="image/*"
          onChange={AddAvatarHandler}
          type="file"
          className="w-0 h-0 absolute top-[1000px]"
        />
        <Image
          width={600}
          height={600}
          alt="test"
          src={avatar || "/images/guest-avatar.webp"}
          className="w-full h-full object-cover rounded-full"
        />
        <div className="bg-black/40 group-hover:opacity-100 transition duration-300 opacity-0 cursor-pointer rounded-full w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <MdPhotoCamera className="text-zinc-300 text-xl" />
        </div>
      </label>
    </div>
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
}
