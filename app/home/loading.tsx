import ColPostLoading from "@/components/module/skeletonLoadings/colPost";
import PostLoading from "@/components/module/skeletonLoadings/post";

export default function HomeLoading() {
  return (
    <div className="grid grid-cols-[1fr] gap-8 w-full">
      <PostLoading />
      <PostLoading />
      <div className="flex w-full overflow-hidden gap-4 px-4 pt-24 pb-4 border border-zinc-200 dark:border-zinc-800 rounded-md">
        {Array.from({ length: 3 }).map((e, i) => (
          <div key={i}>
            <ColPostLoading />
          </div>
        ))}
      </div>
      <PostLoading />
      <PostLoading />
    </div>
  );
}
