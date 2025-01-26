import Image from "next/image";

type ColPostProps = {
  cover: string;
  title: string;
  avatar: string;
  username: string;
  readingTime: number;
  displayName: string;
  id: string;
};

export default function ColPost({
  cover,
  title,
  avatar,
  username,
  readingTime,
  displayName,
  id,
}: ColPostProps) {
  return (
    <div className="w-full h-full bg-white dark:bg-darkColor-800 rounded-md overflow-hidden flex flex-col">
      <Image
        src={cover}
        width={800}
        height={800}
        alt={title}
        className="h-[190px] object-cover"
      />
      <div className="p-4 flex flex-col">
        <h4 className="twoLineText text-myText-600 text-sm vazir-bold">
          {title}
        </h4>
        <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <Image
              src={avatar}
              width={100}
              height={100}
              alt={username}
              className="w-[20px] object-cover rounded-full"
            />
            <span className="text-xs block w-full truncate">
              {displayName || username}
            </span>
          </div>
          <span className="text-xs text-myText-600">
            خواندن {readingTime} دقیقه
          </span>
        </div>
      </div>
    </div>
  );
}
