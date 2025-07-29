export default function CommentLoading() {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 p-4 rounded-xs">
      <div className="flex items-center gap-4 h-[40px]">
        <div className="rounded-full w-[40px] h-[40px] object-cover bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>

        <div className="flex flex-col justify-between h-full gap-2">
          <div className="w-[150px] h-[40px] object-cover bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
          <div className="w-[100px] h-[40px] object-cover bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
        </div>

        <div className="flex items-center justify-between text-xl">
          <button className="flex items-center gap-2">
            <span className="text-base"></span>
          </button>
        </div>
      </div>
      <div className="w-full h-[20px] object-cover bg-zinc-200 dark:bg-zinc-800 animate-pulse mt-8"></div>
      <div className="w-full h-[20px] object-cover bg-zinc-200 dark:bg-zinc-800 animate-pulse mt-2"></div>
      <div className="w-full h-[20px] object-cover bg-zinc-200 dark:bg-zinc-800 animate-pulse mt-2"></div>
    </div>
  );
}
