export default function ColPostLoading() {
  return (
    <div className="w-[250px] h-full bg-white dark:bg-darkColor-800 rounded-md overflow-hidden flex flex-col">
      <div className="h-[190px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
      <div className="p-4 flex flex-col">
        <h4 className="bg-zinc-200 dark:bg-zinc-800 animate-pulse twoLineText text-myText-600 w-full h-[40px] text-sm vazir-bold"></h4>
        <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="bg-zinc-200 dark:bg-zinc-800 animate-pulse w-[20px] h-[20px] object-cover rounded-full"></div>
            <span className="bg-zinc-200 dark:bg-zinc-800 animate-pulse w-[150px] h-[16px] block truncate"></span>
          </div>
          <span className="bg-zinc-200 dark:bg-zinc-800 animate-pulse text-xs w-[150px] h-[30px] text-myText-600"></span>
        </div>
      </div>
    </div>
  );
}
