import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";

export default function SettingsMain() {
  return (
    <div className="flex flex-col gap-10 pt-10 lg:pb-10 pb-20">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-bold">نام نمایشی</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            این نام در پروفایل شما نمایش داده می‌شود
          </h4>
        </div>
        <FaEdit className="text-xl" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-bold">درباره شما</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            بیوگرافی شما در صفحه پروفایل نمایش داده می شود. حداکثر ۲۰۰ کاراکتر
          </h4>
        </div>
        <FaEdit className="text-xl" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-bold">عکس پروفایل</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            عکس شما در صفحه پروفایل و پست‌ها نمایش داده می‌شود.
          </h4>
        </div>
        <label className="relative w-[60px] h-[60px] group">
          <input type="file" className="w-0 h-0 absolute" />
          <Image
            width={600}
            height={600}
            alt="test"
            src={"/images/avatar-default.jpg"}
            className="w-full h-full object-cover rounded-full"
          />
          <div className="bg-black/40 group-hover:opacity-100 transition duration-300 opacity-0 cursor-pointer rounded-full w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <MdPhotoCamera className="text-zinc-300 text-xl" />
          </div>
        </label>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-bold">جنسیت</h3>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <span>مرد</span>
            <input type="radio" />
          </label>
          <label className="flex items-center gap-2">
            <span>زن</span>
            <input type="radio" />
          </label>
          <label className="flex items-center gap-2">
            <span>سایر</span>
            <input type="radio" />
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-bold">تاریخ تولد</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            تاریخ تولد در پروفایل نمایش داده نمی‌شود.
          </h4>
        </div>
        <FaEdit className="text-xl" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-bold">پروفایل اکس (x.com)</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            نام کاربری شما در اکس
          </h4>
        </div>
        <button className="text-sm vazir-medium hover:bg-zinc-800 hover:text-white transition px-4 py-1 border-2 border-zinc-800 rounded-full">
          افزودن
        </button>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-bold">پروفایل لینکدین</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            نام کاربری شما در لینکدین
          </h4>
        </div>
        <button className="text-sm vazir-medium hover:bg-zinc-800 hover:text-white transition px-4 py-1 border-2 border-zinc-800 rounded-full">
          افزودن
        </button>
      </div>
    </div>
  );
}
