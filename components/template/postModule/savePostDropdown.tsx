import { RiLock2Fill } from "react-icons/ri";

export default function SavePostDropDown({ Close }: { Close: () => void }) {
  return (
    <>
      <section
        onClick={Close}
        className="w-full h-screen fixed top-0 left-0 z-40"
      ></section>
      <div className="w-[250px] z-40 bottom-10 left-0 absolute shadow-lg border border-zinc-200 dark:border-zinc-800 transition dark:bg-darkColor-800 bg-white rounded-md rounded-bl-none">
        <span className="w-[13px] h-[13px] bg-white absolute border-b border-r border-zinc-200 transition dark:border-zinc-800 dark:bg-darkColor-800 rotate-45 bottom-[-7px] left-1"></span>
        <div className="flex flex-col gap-4 p-4">
          <label className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm dark:text-myText-200 vazir-medium">
                پست های ذخیره شده
              </span>
            </div>
            <RiLock2Fill className="text-base" />
          </label>
        </div>
        <hr className="border-zinc-200 dark:border-zinc-800" />
        <button className="text-sm text-myGreen-600 py-4 hover:text-myGreen-700 transition text-center w-full">
          ساخت لیست جدید
        </button>
      </div>
    </>
  );
}
