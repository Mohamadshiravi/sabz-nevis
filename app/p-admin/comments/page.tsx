import AllCommentSection from "@/components/template/p-admin/comments/allCommentsSection";
import LastestCommentSection from "@/components/template/p-admin/comments/lastestCommentSection";
import { commentModel } from "@/models";
import { FaRegComments } from "react-icons/fa";

export default async function AdminPanelDashboard() {
  const comments = await commentModel.find({}, "_id");

  return (
    <section className="mt-8">
      <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 flex-grow rounded-md flex gap-8 items-center justify-center vazir-medium">
        <div className="flex flex-col items-center gap-2 text-lg">
          <span>مجموع کامنت ها</span>
          <span className="font-mono font-bold text-3xl text-myGreen-600">
            {comments.length}
          </span>
        </div>
        <FaRegComments className="text-7xl dark:text-zinc-700" />
      </div>
      <LastestCommentSection isSimple />
      <AllCommentSection />
    </section>
  );
}
