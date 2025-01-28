import Image from "next/image";
import Link from "next/link";

type ColPostProps = {
  cover: string;
  title: string;
  avatar: string;
  username: string;
  readingTime: string;
  displayName: string;
  id: string;
  bordered?: boolean;
};

export default function ColPost({
  cover,
  title,
  avatar,
  username,
  readingTime,
  displayName,
  id,
  bordered,
}: ColPostProps) {
  return (
    <div
      className={`${
        bordered && "border border-zinc-200 dark:border-zinc-800"
      } w-full h-full bg-white dark:bg-darkColor-800 rounded-md overflow-hidden flex flex-col`}
    >
      <Image
        src={cover}
        width={800}
        height={800}
        alt={"post cover"}
        className="h-[190px] object-cover"
      />
      <div className="p-4 flex flex-col">
        <Link
          href={`/@${username}/posts/${id}`}
          className="twoLineText text-myText-600 text-sm vazir-bold"
        >
          {title}
        </Link>
        <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href={`/@${username}/profile`}
            className="flex items-center gap-4"
          >
            <Image
              src={avatar}
              width={100}
              height={100}
              alt={"user avatar"}
              className="w-[20px] h-[20px] object-cover rounded-full"
            />
            <span className="text-xs block w-full truncate">
              {displayName || username}
            </span>
          </Link>
          <span className="text-xs text-myText-600">
            خواندن {readingTime} دقیقه
          </span>
        </div>
      </div>
    </div>
  );
}
