import Header from "@/components/module/header";
import { listModel } from "@/models/index";
import mongoose from "mongoose";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import ConnectToDB from "@/DB/connectToDB";
import Post from "@/components/module/post";
import { PostModelType } from "@/models/post";
import PostLoading from "@/components/module/skeletonLoadings/post";

type userPostsProps = {
  params: { id: string };
};

export default async function UserLists({ params }: userPostsProps) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  await ConnectToDB();

  const list = await listModel
    .findById(params.id, "-__v")
    .populate("user", "username displayName avatar")
    .populate({
      path: "posts",
      select: "-body -imagesUrl -imagesID -updatedAt -status",
      populate: {
        path: "user",
        select: "username displayName avatar",
      },
    });

  if (!list) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="md:w-[768px] w-full md:px-0 px-4 m-auto md:py-10 py-4">
        <div className="flex items-center gap-4 h-[50px]">
          <Image
            src={list.user.avatar}
            width={400}
            height={400}
            alt={"user avatar"}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
          <div className="flex flex-col justify-between h-full">
            <span>{list.user.displayName || list.user.username}</span>
            <div className="flex items-center gap-2">
              <span className="sm:text-xs text-[10px] text-myText-500">
                خواندن {list?.readingTime} دقیقه
              </span>
              <GoDotFill className="text-[4px] text-myText-500" />
              <span className="sm:text-xs text-[10px] text-myText-500">
                {list.posts.length} پست
              </span>
            </div>
          </div>
        </div>
        <h1 className="text-3xl vazir-black my-10">{list.name}</h1>

        {list.posts.length === 0 ? (
          <div>پستی وجود ندارد</div>
        ) : (
          <div>
            {list.posts.map((e: PostModelType, i: any) => (
              <Post border key={i} data={JSON.parse(JSON.stringify(e))} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  await ConnectToDB();
  const list = await listModel.findOne({ _id: params.id }, "name -_id");

  return {
    title: `${list.name} - سبزنویس`,
  };
}
