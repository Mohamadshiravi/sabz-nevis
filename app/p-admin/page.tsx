import LastestCommentSection from "@/components/template/p-admin/comments/lastestCommentSection";
import ConnectToDB from "@/DB/connectToDB";
import {
  categoryModel,
  commentModel,
  listModel,
  postModel,
  userModel,
} from "@/models";
import { BsPostcard } from "react-icons/bs";
import { FaRegComments, FaRegUser } from "react-icons/fa";
import { GoBookmark } from "react-icons/go";
import { MdOutlineLabel } from "react-icons/md";

export default async function AdminPanelDashboard() {
  await ConnectToDB();
  const posts = await postModel.find({ status: "completed" }, "_id");
  const lists = await listModel.find({ status: "public" }, "_id");
  const users = await userModel.find({}, "_id");
  const comments = await commentModel.find({}, "_id");
  const categories = await categoryModel.find({}, "_id");

  return (
    <section>
      <div className="mt-8 flex gap-8 flex-wrap">
        <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 grow rounded-md flex gap-8 items-center justify-center vazir-medium">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع پست ها</span>
            <span className="font-mono font-bold text-3xl text-my-green-600">
              {posts.length}
            </span>
          </div>
          <BsPostcard className="text-7xl dark:text-zinc-700" />
        </div>
        <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 grow rounded-md flex gap-8 items-center justify-center vazir-medium">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع لیست ها</span>
            <span className="font-mono font-bold text-3xl text-my-green-600">
              {lists.length}
            </span>
          </div>
          <GoBookmark className="text-7xl dark:text-zinc-700" />
        </div>
        <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 grow rounded-md flex gap-8 items-center justify-center vazir-medium">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع کاربران</span>
            <span className="font-mono font-bold text-3xl text-my-green-600">
              {users.length}
            </span>
          </div>
          <FaRegUser className="text-7xl dark:text-zinc-700" />
        </div>
        <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 grow rounded-md flex gap-8 items-center justify-center vazir-medium">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع موضوع ها</span>
            <span className="font-mono font-bold text-3xl text-my-green-600">
              {categories.length}
            </span>
          </div>
          <MdOutlineLabel className="text-7xl dark:text-zinc-700" />
        </div>
        <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 grow rounded-md flex gap-8 items-center justify-center vazir-medium">
          <div className="flex flex-col items-center gap-2 text-lg">
            <span>مجموع کامنت ها</span>
            <span className="font-mono font-bold text-3xl text-my-green-600">
              {comments.length}
            </span>
          </div>
          <FaRegComments className="text-7xl dark:text-zinc-700" />
        </div>
      </div>
      <LastestCommentSection />
    </section>
  );
}
