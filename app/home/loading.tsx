import PostLoading from "@/components/module/skeletonLoadings/post";

export default function HomeLoading() {
  return (
    <div className="flex flex-col w-full gap-8 mt-28">
      {Array.from({ length: 4 }).map((e, i) => (
        <PostLoading />
      ))}
    </div>
  );
}
