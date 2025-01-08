import PostLoading from "@/components/module/skeletonLoadings/post";

export default function HomeLoading() {
  return (
    <>
      <div className="bg-zinc-100 h-[70px] w-full"></div>
      <main
        className={`lg:pl-20 lg:pr-[320px] sm:px-6 px-4 mt-10 grid lg:grid-cols-[8fr_4fr] grid-cols-[1fr] gap-10`}
      >
        <div className="flex flex-col w-full gap-8">
          {Array.from({ length: 4 }).map((e, i) => (
            <PostLoading />
          ))}
        </div>
        <div className="w-full bg-zinc-100 h-screen"></div>
      </main>
    </>
  );
}
