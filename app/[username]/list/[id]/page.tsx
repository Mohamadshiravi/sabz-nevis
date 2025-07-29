import Header from "@/components/module/header";
import { listModel } from "@/models/index";
import mongoose from "mongoose";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import ConnectToDB from "@/DB/connectToDB";
import { faIR } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import RenderPostOfList from "@/components/template/me/lists/renderPostOfList";
import IsUserAuthentication from "@/utils/auth/authUser";

type userPostsProps = {
  params: Promise<{ id: string }>;
};

export default async function UserLists(props: userPostsProps) {
  const params = await props.params;
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  await ConnectToDB();

  const list = await listModel
    .findById(params.id, "-__v")
    .populate("user", "username displayName avatar");

  if (!list) {
    notFound();
  }

  if (list.status === "private") {
    const isUserAuth = await IsUserAuthentication();
    if (isUserAuth._id.toString() !== list.user._id.toString()) {
      notFound();
    }
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
              <span className="sm:text-xs text-[10px] text-my-text-500">
                {list.createdAt
                  ? formatDistanceToNow(new Date(list.createdAt), {
                      addSuffix: true,
                      locale: faIR,
                    })
                  : ""}
              </span>
              <GoDotFill className="text-[4px] text-my-text-500" />
              <span className="sm:text-xs text-[10px] text-my-text-500">
                {list.posts.length} پست
              </span>
            </div>
          </div>
        </div>
        <h1 className="text-3xl vazir-black my-10">{list.name}</h1>
        <RenderPostOfList listId={JSON.parse(JSON.stringify(list._id))} />
      </main>
    </>
  );
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await ConnectToDB();
  const list = await listModel.findOne({ _id: params.id }, "name -_id");

  return {
    title: `${list.name} - سبزنویس`,
  };
}
