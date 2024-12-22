import Image from "next/image";
import { GoBookmark, GoComment, GoDotFill, GoHeart } from "react-icons/go";

type PostProps = {
  border?: boolean;
};

export default function Post({ border }: PostProps) {
  return (
    <div
      className={`flex flex-col ${border && "border-b border-zinc-200 pb-6"} `}
    >
      <div className="items-center gap-1 text-virgoolText-600 sm:hidden flex">
        <img
          src="/images/photo_2024-12-15_16-52-24.jpg"
          className="w-[24px] rounded-full ml-3"
        />
        <span className="text-sm text-zinc-600 text-xs">Sadra SG</span>
        <GoDotFill className="text-[4px]" />
        <span className="text-xs">17 دقیقه پیش</span>
      </div>
      <div className="flex justify-between mt-3">
        <div className="flex flex-col sm:gap-3 gap-2 sm:pl-10 pl-4">
          <div className="items-center gap-1 text-virgoolText-600 sm:flex hidden">
            <img
              src="/images/photo_2024-12-15_16-52-24.jpg"
              className="w-[24px] rounded-full ml-3"
            />
            <span className="text-sm text-zinc-600 text-xs">Sadra SG</span>
            <GoDotFill className="text-[4px]" />
            <span className="text-xs">17 دقیقه پیش</span>
          </div>
          <h2 className="text-lg vazir-bold">حقوق مردان چه ؟</h2>
          <p className="twoLineText sm:text-sm text-xs text-virgoolText-600">
            تو این دوره زمونه به ما مردا کم ظلم نشده؛از نا عدالتی ها تا طرد
            شدنمون از جامعه.بیشتر زنا از مردا بخاطر کارای اجدادمون متنفرن.بعضی
            نام فک م…شدنمون از جامعه.بیشتر زنا از مردا بخاطر کارای اجدادمون
            متنفرن.بعضی نام فک م… شدنمون از جامعه.بیشتر زنا از مردا بخاطر کارای
            اجدادمون متنفرن.بعضی نام فک م… شدنمون از جامعه.بیشتر زنا از مردا
            بخاطر کارای اجدادمون متنفرن.بعضی نام فک م…
          </p>
        </div>

        <Image
          src={"/images/milky-way-mountains-5120x5120-15475.jpg"}
          width={800}
          height={800}
          alt="photo title"
          className="sm:w-[120px] sm:h-[120px] w-[90px] h-[90px] rounded-sm object-cover"
        />
      </div>
      <div className="w-full flex justify-between mt-8">
        <div className="flex items-center gap-3">
          <span className="text-virgoolText-800 text-xs bg-zinc-200 sm:px-8 px-3 py-1 rounded-sm">
            عمومی
          </span>
          <span className="sm:text-xs text-[10px] text-virgoolText-500">
            خواندن ۱ دقیقه
          </span>
        </div>
        <div className="flex items-center sm:gap-16 gap-6 text-2xl text-virgoolText-600">
          <button className="flex items-center gap-2">
            <GoHeart className="hover:text-red-600 transition" />
            <span className="text-lg">0</span>
          </button>
          <button className="flex items-center gap-2">
            <GoComment className="hover:text-zinc-800 transition" />
            <span className="text-lg">0</span>
          </button>
          <button>
            <GoBookmark className="hover:text-blue-600 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}
