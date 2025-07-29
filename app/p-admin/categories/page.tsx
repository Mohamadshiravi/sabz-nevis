import AllCategoriesSection from "@/components/template/p-admin/categories/allCategoriesSection";
import AllCommentSection from "@/components/template/p-admin/comments/allCommentsSection";
import LastestCommentSection from "@/components/template/p-admin/comments/lastestCommentSection";
import ConnectToDB from "@/DB/connectToDB";
import { categoryModel, commentModel } from "@/models";
import { MdOutlineLabel } from "react-icons/md";

export default async function AdminPanelCategoriesPage() {
  await ConnectToDB();
  const categories = await categoryModel.find({}, "_id");

  return (
    <section className="mt-8">
      <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 grow rounded-md flex gap-8 items-center justify-center vazir-medium">
        <div className="flex flex-col items-center gap-2 text-lg">
          <span>مجموع موضوع ها</span>
          <span className="font-mono font-bold text-3xl text-my-green-600">
            {categories.length}
          </span>
        </div>
        <MdOutlineLabel className="text-7xl dark:text-zinc-700" />
      </div>
      <AllCategoriesSection />
    </section>
  );
}
