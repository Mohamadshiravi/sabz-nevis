import AllListsSection from "@/components/template/p-admin/lists/allListSection";
import ConnectToDB from "@/DB/connectToDB";
import { listModel } from "@/models";
import { BsPostcard } from "react-icons/bs";

export default async function AdminPanellistsPage() {
  await ConnectToDB();
  const lists = await listModel.find({ status: "public" }, "_id");
  return (
    <section className="mt-8">
      <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-10 flex-grow rounded-md flex gap-8 items-center justify-center vazir-medium">
        <div className="flex flex-col items-center gap-2 text-lg">
          <span>مجموع لیست ها</span>
          <span className="font-mono font-bold text-3xl text-myGreen-600">
            {lists.length}
          </span>
        </div>
        <BsPostcard className="text-7xl dark:text-zinc-700" />
      </div>
      <AllListsSection />
    </section>
  );
}
