import { CommentModelType } from "@/models/comment";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import Image from "next/image";
import { FaReply } from "react-icons/fa";
import { GoHeart } from "react-icons/go";

export default function Comments({
  comments,
}: {
  comments: CommentModelType[];
}) {
  return (
    <div className="mt-10 flex flex-col gap-3">
      {comments.map((e, i) => (
        <div className="border border-zinc-200 dark:border-zinc-800 p-4 rounded-sm">
          <div className="flex items-center gap-4 h-[40px]">
            <Image
              src={e.avatar}
              width={300}
              height={300}
              alt={e.name}
              className="rounded-full w-[40px] h-[40px] object-cover"
            />
            <div className="flex flex-col justify-between h-full">
              <span className="text-myGreen-600 text-sm">{e.name}</span>
              <span className="text-xs text-myText-500">
                {e.createdAt
                  ? formatDistanceToNow(new Date(e.createdAt), {
                      addSuffix: true,
                      locale: faIR,
                    })
                  : ""}
              </span>
            </div>
          </div>
          <div className="py-6 text-sm">{e.body}</div>
          <div className="flex items-center justify-between text-xl">
            <button className="flex items-center gap-2">
              <GoHeart className="hover:text-red-600 transition" />
              <span className="text-base">2</span>
            </button>
            <button className="text-myText-500 hover:text-myText-600 transition">
              <FaReply />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
