import PostLoading from "@/components/module/skeletonLoadings/post";

export default function ListLoadingLayout() {
  return (
    <section>
      <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[60px] animate-pulse"></div>
      <section className="md:w-[768px] w-full md:px-0 px-4 m-auto md:py-10 py-4">
        <div>
          <div className="flex h-[50px] gap-4">
            <div className="bg-zinc-200 dark:bg-zinc-800 h-[50px] w-[50px] rounded-full animate-pulse"></div>
            <div className="flex flex-col justify-between h-full">
              <div className="bg-zinc-200 dark:bg-zinc-800 h-[20px] w-[100px] animate-pulse"></div>
              <div className="bg-zinc-200 dark:bg-zinc-800 h-[20px] w-[150px] animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 my-10">
            <PostLoading />
            <PostLoading />
            <PostLoading />
            <PostLoading />
          </div>
        </div>
      </section>
    </section>
  );
}
