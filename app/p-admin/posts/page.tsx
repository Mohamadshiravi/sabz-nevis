import AllPostsSection from "@/components/template/p-admin/posts/allPostsSection";
import { postModel } from "@/models";
import { BsPostcard } from "react-icons/bs";

export default async function AdminPanelPostsPage() {
  const posts = await postModel.find({}, "_id");
  return (
    <section className="mt-8">
      <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 flex-grow rounded-md flex gap-8 items-center justify-center vazir-medium">
        <div className="flex flex-col items-center gap-2 text-lg">
          <span>مجموع پست ها</span>
          <span className="font-mono font-bold text-3xl text-myGreen-600">
            {posts.length}
          </span>
        </div>
        <BsPostcard className="text-7xl dark:text-zinc-700" />
      </div>
      <AllPostsSection />
    </section>
  );
}
