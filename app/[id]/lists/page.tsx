"use client";

import List from "@/components/module/me/list";

export default async function ListsProfileSction({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <section className="pt-12 pb-24 bg-white dark:bg-darkColor-800">
        <div className="flex lg:w-[800px] md:w-[600px] w-full flex-col md:px-0 px-6 items-center m-auto gap-3 md:text-right text-center md:text-base text-sm">
          <List />
        </div>
      </section>
    </>
  );
}
