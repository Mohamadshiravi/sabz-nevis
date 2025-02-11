import AllPostsSection from "@/components/template/p-admin/posts/allPostsSection";
import AllUsersSection from "@/components/template/p-admin/users/allusersSection";
import ConnectToDB from "@/DB/connectToDB";
import { userModel } from "@/models";
import { FaRegUser } from "react-icons/fa";

export default async function AdminPanelPostsPage() {
  await ConnectToDB();
  const users = await userModel.find({}, "_id");
  return (
    <section className="mt-8">
      <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 flex-grow rounded-md flex gap-8 items-center justify-center vazir-medium">
        <div className="flex flex-col items-center gap-2 text-lg">
          <span>مجموع کاربران</span>
          <span className="font-mono font-bold text-3xl text-myGreen-600">
            {users.length}
          </span>
        </div>
        <FaRegUser className="text-7xl dark:text-zinc-700" />
      </div>
      <AllUsersSection />
    </section>
  );
}
