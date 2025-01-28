import Header from "@/components/module/header";
import UserDetailsSection from "@/components/template/post/userDetailsSection";
import MayLikeSlider from "@/components/template/post/mayLikeSlider";
import { postModel } from "@/models/index";
import IsUserAuthentication from "@/utils/auth/authUser";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import mongoose from "mongoose";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { GoBookmark, GoComment, GoHeart } from "react-icons/go";
import UserDetailsSectionCol from "@/components/template/post/userDetailsSectionCol";
import ConnectToDB from "@/DB/connectToDB";
import AddCommentSection from "@/components/template/post/addCommentSection";
import Comments from "@/components/template/post/comments";
import { Suspense } from "react";

type userPostsProps = {
  params: { id: string };
};

export default async function userPosts({ params }: userPostsProps) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  ConnectToDB();

  const post = await postModel
    .findOne({ _id: params.id }, "-imagesID -status -__v -updatedAt -desc")
    .populate("user", "avatar displayName username about followers")
    .populate({
      path: "comments",
      select: "-__v",
      populate: [
        {
          path: "replies",
          select: "-__v -post -replyTo -updatedAt -replies",
          populate: {
            path: "user",
            select: "username displayName avatar",
          },
        },
        {
          path: "user",
          select: "username displayName avatar",
        },
      ],
    });

  if (!post) {
    notFound();
  }

  let isUserHere = false;
  const isUserLogedIn = await IsUserAuthentication();

  if (isUserLogedIn) {
    if (isUserLogedIn._id.toString() === post.user._id.toString()) {
      isUserHere = true;
    }
  }

  const relativeDate = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
        locale: faIR,
      })
    : "";
  return (
    <>
      <Header />
      <main className="grid lg:grid-cols-[8.5fr_3.5fr]">
        <section className="md:px-20 px-4 md:py-12 py-4 w-full">
          <div className="flex items-center gap-4 h-[50px]">
            <Image
              src={post.user.avatar}
              width={400}
              height={400}
              alt={"user avatar"}
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
            <div className="flex flex-col justify-between h-full">
              <span>{post.user.displayName || post.user.username}</span>
              <div className="flex items-center gap-2">
                <span className="sm:text-xs text-[10px] text-myText-500">
                  خواندن {post?.readingTime} دقیقه
                </span>
                <GoDotFill className="text-[4px] text-myText-500" />
                <span className="sm:text-xs text-[10px] text-myText-500">
                  {relativeDate}
                </span>
              </div>
            </div>
          </div>
          <div className="py-8 w-full">
            <h1 className="text-3xl vazir-black">{post.title}</h1>
            <div
              className="renderHtmlDiv mt-6"
              dangerouslySetInnerHTML={{ __html: post.body }}
            ></div>
          </div>
          <div className="border-b border-zinc-200 dark:border-zinc-800 py-4 flex items-center justify-between">
            <span className="text-xs border border-zinc-200 dark:border-zinc-800 px-4 py-1 rounded-sm text-myText-500 dark:text-myText-600">
              {post.category}
            </span>
            <div className="flex items-center gap-6 text-xl text-myText-600">
              <button className="flex items-center gap-2">
                <GoHeart className="hover:text-red-600 transition" />
                <span className="text-lg">2</span>
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
          <UserDetailsSection
            followers={JSON.parse(JSON.stringify(post.user.followers))}
            id={JSON.parse(JSON.stringify(post.user._id))}
            avatar={JSON.parse(JSON.stringify(post.user.avatar))}
            displayName={JSON.parse(
              JSON.stringify(post.user.displayName || null)
            )}
            about={JSON.parse(JSON.stringify(post.user.about))}
            username={JSON.parse(JSON.stringify(post.user.username))}
            isUserHere={JSON.parse(JSON.stringify(isUserHere))}
          />
          <MayLikeSlider
            category={JSON.parse(JSON.stringify(post.category))}
            current={JSON.parse(JSON.stringify(post._id))}
          />
          <div className="sm:py-8 sm:mt-0 mt-8">
            <div className="flex items-center gap-3 justify-center">
              <span className="bg-myGreen-600 text-white rounded-full flex items-center justify-center w-[40px] h-[40px] text-xl">
                <GoComment />
              </span>
              <span className="vazir-medium">نظرات</span>
            </div>
            <AddCommentSection id={JSON.parse(JSON.stringify(post._id))} />
            <Comments comments={JSON.parse(JSON.stringify(post.comments))} />
          </div>
        </section>
        <section className="w-full lg:block hidden border-r border-zinc-200 dark:border-zinc-800 px-6 md:py-12 py-6">
          <UserDetailsSectionCol
            id={JSON.parse(JSON.stringify(post.user._id))}
            avatar={JSON.parse(JSON.stringify(post.user.avatar))}
            displayName={JSON.parse(
              JSON.stringify(post.user.displayName || null)
            )}
            about={JSON.parse(JSON.stringify(post.user.about))}
            username={JSON.parse(JSON.stringify(post.user.username))}
            isUserHere={JSON.parse(JSON.stringify(isUserHere))}
          />
        </section>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  await ConnectToDB();
  const post = await postModel.findOne({ _id: params.id }, "title -_id");

  return {
    title: `${post.title} - سبزنویس`,
  };
}
