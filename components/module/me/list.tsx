import { RiLock2Fill } from "react-icons/ri";

export default function List() {
  return (
    <div className="flex justify-between sm:flex-row flex-col bg-zinc-100 border border-zinc-200 rounded-md overflow-hidden">
      <div className="px-4 flex flex-col justify-between">
        <h3 className="vazir-bold sm:text-2xl text-xl mt-4">
          پست های ذخیره شده
        </h3>
        <div className="flex items-center gap-6 py-4 sm:mt-0 mt-2">
          <button className="sm:text-sm text-xs vazir-medium hover:bg-zinc-800 hover:text-white transition px-4 py-1 border-2 border-zinc-800 rounded-full">
            مشاهده لیست
          </button>
          <RiLock2Fill />
        </div>
      </div>
      <div className="grid sm:grid-cols-[6fr_6fr] grid-cols-[3fr_3fr_3fr_3fr] sm:gap-0.5 gap-1">
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200"></div>
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200"></div>
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200"></div>
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200"></div>
      </div>
    </div>
  );
}
