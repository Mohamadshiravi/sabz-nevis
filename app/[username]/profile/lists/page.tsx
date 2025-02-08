import List from "@/components/module/me/list";
import { listModel, userModel } from "@/models";

export default async function ListsProfileSction({
  params,
}: {
  params: { username: string };
}) {
  const user = await userModel.findOne(
    { username: params.username.slice(3) },
    "_id"
  );

  const lists = await listModel
    .find({
      user: user._id,
      status: "public",
    })
    .populate("posts", "cover _id")
    .populate("user", "username");

  return (
    <>
      <section className="pt-12 pb-24 bg-white dark:bg-darkColor-800">
        <div className="flex lg:w-[800px] md:w-[600px] w-full flex-col md:px-0 px-6 items-center m-auto gap-3 md:text-right text-center md:text-base text-sm">
          {lists.length === 0 ? (
            <div>این کاربر هنوز لیستی ندارد</div>
          ) : (
            lists.map((e, i) => (
              <List key={i} data={JSON.parse(JSON.stringify(e))} />
            ))
          )}
        </div>
      </section>
    </>
  );
}
