import { FaEdit } from "react-icons/fa";
import { IoMoonSharp } from "react-icons/io5";
import { MdOutlineAccessTime, MdSunny } from "react-icons/md";

export default function SettingsAdvanced() {
  return (
    <div className="flex flex-col gap-10 pt-10 lg:pb-10 pb-20">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-medium">نسخه پشتیبان</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            دریافت نسخه پشتیبان از محتوا
          </h4>
        </div>
        <button className="text-xs vazir-medium hover:bg-zinc-800 hover:text-white transition px-4 py-1 border-2 border-zinc-800 rounded-full">
          download.zip
        </button>
      </div>
      <hr />

      <h3 className="vazir-bold">تنظیمات حالت شب</h3>
      <div className="flex sm:flex-row flex-col gap-3 items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-medium">حالت شب</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            حالت خودکار از ساعت ۰۰:۰۰ تا ۶:۰۰ فعال می‌شود.
          </h4>
        </div>
        <div className="flex items-center border border-zinc-400 text-xl rounded-full overflow-hidden">
          <button className="px-4 py-2 border-l border-zinc-400">
            <IoMoonSharp />
          </button>
          <button className="px-4 py-2">
            <MdOutlineAccessTime />
          </button>
          <button className="px-4 py-2 border-r border-zinc-400 bg-virgoolBlue text-white">
            <MdSunny />
          </button>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-3 items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h4 className="text-virgoolText-600 text-sm pl-2">
            نمایش دکمه خاموش/روشن در منوی پروفایل کاربری
          </h4>
        </div>
        <div className="flex items-center border border-zinc-400 text-sm rounded-full vazir-medium overflow-hidden">
          <button className="px-4 py-2 border-l border-zinc-400">خیر</button>
          <button className="px-4 py-2 border-r border-zinc-400 bg-virgoolBlue text-white">
            بله
          </button>
        </div>
      </div>
    </div>
  );
}
