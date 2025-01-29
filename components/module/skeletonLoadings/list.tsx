export default function ListLoading() {
  return (
    <div className="flex w-full justify-between sm:flex-row flex-col bg-zinc-100 dark:bg-darkColor-700 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden">
      <div className="px-4 flex flex-col justify-between">
        <div className="w-[240px] h-[40px] bg-zinc-200 dark:bg-zinc-700 animate-pulse mt-5"></div>
        <div className="flex items-center gap-6 py-4 sm:mt-0 mt-2">
          <div className="sm:w-[150px] w-full h-[35px] rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
          <div className="w-[35px] h-[35px] rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse"></div>
        </div>
      </div>
      <div className="grid sm:grid-cols-[6fr_6fr] grid-cols-[3fr_3fr_3fr_3fr] sm:gap-0.5 gap-1">
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200 dark:bg-darkColor-600 animate-pulse"></div>
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200 dark:bg-darkColor-600 animate-pulse"></div>
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200 dark:bg-darkColor-600 animate-pulse"></div>
        <div className="sm:w-[100px] w-full aspect-square bg-zinc-200 dark:bg-darkColor-600 animate-pulse"></div>
      </div>
    </div>
  );
}
