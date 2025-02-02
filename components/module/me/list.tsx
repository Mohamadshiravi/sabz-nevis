"use client";

import { RiLock2Fill } from "react-icons/ri";
import PrimaryBtn from "../primaryBtn";
import { ListModelType } from "@/models/list";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTypedSelector } from "@/redux/typedHooks";

export default function List({ data }: { data: ListModelType }) {
  const router = useRouter();

  const username = useTypedSelector((state) => state.user).data?.username;
  return (
    <div className="flex w-full justify-between sm:flex-row flex-col bg-zinc-100 dark:bg-darkColor-700 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden">
      <div className="px-4 flex flex-col justify-between">
        <h3 className="vazir-bold sm:text-2xl text-xl mt-4">{data.name}</h3>
        <div className="flex items-center gap-6 py-4 sm:mt-0 mt-2">
          <PrimaryBtn
            onPress={() => router.push(`/@${username}/list/${data._id}`)}
          >
            مشاهده لیست
          </PrimaryBtn>
          {data.status === "private" && <RiLock2Fill />}
        </div>
      </div>
      <div className="grid sm:h-[200px] h-[100px] sm:w-[200px] w-full sm:grid-cols-[6fr_6fr] grid-cols-[3fr_3fr_3fr_3fr] sm:gap-0.5 gap-1">
        {data.posts.slice(0, 3).map((e, i) => (
          <Image
            key={i}
            alt="post cover"
            width={600}
            height={600}
            src={e.cover}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}
