import { RiLock2Fill } from "react-icons/ri";
import PrimaryBtn from "../primaryBtn";

export default function List() {
  return (
    <div className="flex w-full justify-between sm:flex-row flex-col bg-zinc-100 dark:bg-darkColor-700 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden">
      <div className="px-4 flex flex-col justify-between">
        <h3 className="vazir-bold sm:text-2xl text-xl mt-4">
          پست های ذخیره شده
        </h3>
        <div className="flex items-center gap-6 py-4 sm:mt-0 mt-2">
          <PrimaryBtn>مشاهده لیست</PrimaryBtn>
          <RiLock2Fill />
        </div>
      </div>
      <div className="grid sm:grid-cols-[6fr_6fr] grid-cols-[3fr_3fr_3fr_3fr] sm:gap-0.5 gap-1">
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200 dark:bg-darkColor-600"></div>
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200 dark:bg-darkColor-600"></div>
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200 dark:bg-darkColor-600"></div>
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200 dark:bg-darkColor-600"></div>
      </div>
    </div>
  );
}
