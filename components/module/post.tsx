import { PostModelType } from "@/models/post";
import Image from "next/image";
import { useEffect } from "react";
import { GoBookmark, GoComment, GoDotFill, GoHeart } from "react-icons/go";

type PostProps = {
  border?: boolean;
  data?: PostModelType | null;
};

export default function Post({ border, data }: PostProps) {
  return (
    <div
      className={`flex flex-col ${
        border && "border-b border-zinc-200 dark:border-b-zinc-800 pb-6"
      } `}
    >
      <div className="items-center gap-1 text-myText-600 sm:hidden flex">
        <Image
          alt={"user avatar"}
          width={200}
          height={200}
          src={data?.user.avatar || "/images/avatar-default.jpg"}
          className="w-[24px] rounded-full ml-3"
        />
        <span className="text-sm text-white text-xs">
          {data?.user.displayName
            ? data?.user.displayName
            : data?.user.username}
        </span>
        <GoDotFill className="text-[4px]" />
        <span className="text-xs">17 دقیقه پیش</span>
      </div>
      <div className="flex justify-between mt-3">
        <div className="flex flex-col sm:gap-3 gap-2 sm:pl-10 pl-4">
          <div className="items-center gap-1 text-myText-600 sm:flex hidden">
            <Image
              alt={"user avatar"}
              width={200}
              height={200}
              src={data?.user.avatar || "/images/avatar-default.jpg"}
              className="w-[24px] rounded-full ml-3"
            />
            <span className="text-sm text-white text-xs">
              {data?.user.displayName
                ? data?.user.displayName
                : data?.user.username}
            </span>
            <GoDotFill className="text-[4px]" />
            <span className="text-xs">17 دقیقه پیش</span>
          </div>
          <h2 className="text-lg vazir-bold">{data?.title}</h2>
          <p className="twoLineText sm:text-sm text-xs text-myText-600">
            تو این دوره زمونه به ما مردا کم ظلم نشده؛از نا عدالتی ها تا طرد
            شدنمون از جامعه.بیشتر زنا از مردا بخاطر کارای اجدادمون متنفرن.بعضی
            نام فک م…شدنمون از جامعه.بیشتر زنا از مردا بخاطر کارای اجدادمون
            متنفرن.بعضی نام فک م… شدنمون از جامعه.بیشتر زنا از مردا بخاطر کارای
            اجدادمون متنفرن.بعضی نام فک م… شدنمون از جامعه.بیشتر زنا از مردا
            بخاطر کارای اجدادمون متنفرن.بعضی نام فک م…
          </p>
        </div>

        <Image
          src={data?.cover || "/images/img-default.jpg"}
          width={800}
          height={800}
          alt="photo title"
          className="sm:w-[120px] sm:h-[120px] w-[90px] h-[90px] rounded-sm object-cover"
        />
      </div>
      <div className="w-full flex justify-between mt-8">
        <div className="flex items-center gap-3">
          <span className="text-myText-800 dark:text-myText-400 text-xs bg-zinc-200 dark:bg-darkColor-600 sm:px-8 px-3 py-1 rounded-sm">
            {data?.category}
          </span>
          <span className="sm:text-xs text-[10px] text-myText-500">
            خواندن {data?.readingTime} دقیقه
          </span>
        </div>
        <div className="flex items-center sm:gap-16 gap-6 text-2xl text-myText-600">
          <button className="flex items-center gap-2">
            <GoHeart className="hover:text-red-600 transition" />
            <span className="text-lg">{data?.likes}</span>
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
