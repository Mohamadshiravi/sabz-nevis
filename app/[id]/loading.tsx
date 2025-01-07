export default function ProfileLoading() {
  return (
    <section className="border-b-2 border-zinc-200 dark:border-b-zinc-700">
      <section className="flex flex-col items-center mt-4 gap-2">
        <div className="w-[100px] aspect-square bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-full"></div>
        <div className="w-[150px] h-[30px] bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
        <div className="w-[400px] h-[15px] bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
        <div className="w-[400px] h-[15px] bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
        <div className="w-[400px] h-[15px] bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
        <div className="flex items-center gap-6 mt-3">
          <div className="w-[150px] h-[20px] bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
          <div className="w-[150px] h-[20px] bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
        </div>
        <div className="w-[200px] h-[35px] bg-zinc-200 dark:bg-zinc-700 animate-pulse mt-4 rounded-full"></div>
        <div className="w-[25px] mt-2 aspect-square bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-full"></div>
        <div className="flex items-center gap-6 py-3">
          <div className="w-[60px] h-[20px] bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
          <div className="w-[60px] h-[20px] bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
          <div className="w-[60px] h-[20px] bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
        </div>
      </section>
    </section>
  );
}
