import { FaHeadphones } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GoBookmark } from "react-icons/go";
import { IoBarChartOutline } from "react-icons/io5";
import { TiHome } from "react-icons/ti";

export default function DesktopNavbar() {
  return (
    <div className="w-full lg:flex hidden flex-col justify-between h-screen pb-24 bg-white border-l border-zinc-200 pt-14 px-8 sticky top-16">
      <ul className="flex flex-col gap-8">
        <li className="flex items-center gap-3 text-base text-virgoolBlue">
          <TiHome className="text-2xl" />
          <span className="text-nowrap">صفحه اصلی</span>
        </li>
        <li className="flex items-center gap-3 text-base">
          <FaHeadphones className="text-2xl" />
          <span className="text-nowrap">پادکست ها</span>
        </li>
        <li className="flex items-center gap-3 text-base">
          <IoBarChartOutline className="text-2xl" />
          <span className="text-nowrap">امار بازدید</span>
        </li>
        <li className="flex items-center gap-3 text-base">
          <GoBookmark className="text-2xl" />
          <span className="text-nowrap">لیست ها</span>
        </li>
        <li className="flex items-center gap-3 text-base">
          <FiSettings className="text-2xl" />
          <span className="text-nowrap">حساب کاربری</span>
        </li>
      </ul>
      <button className="bg-virgoolBlue text-nowrap w-full rounded-full px-8 text-sm text-white py-1.5 vazir-bold">
        نوشتن پست
      </button>
    </div>
  );
}
