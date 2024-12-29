export default function PostLoading() {
  return (
    <div className={`flex flex-col border-b border-zinc-200 pb-6 `}>
      <div className="items-center gap-1 sm:hidden flex">
        <div className="w-[24px] aspect-square rounded-full ml-3 bg-zinc-100 animate-pulse" />
        <div className="w-[100px] h-[10px] bg-zinc-100 animate-pulse"></div>
      </div>
      <div className="flex justify-between mt-3 w-full">
        <div className="flex flex-col w-full sm:gap-3 gap-2 sm:pl-10 pl-4">
          <div className="items-center gap-1 sm:flex hidden">
            <div className="w-[24px] aspect-square rounded-full ml-3 bg-zinc-100 animate-pulse" />
            <div className="w-[100px] h-[10px] bg-zinc-100 animate-pulse"></div>
          </div>
          <div className="bg-zinc-100 h-[30px] w-full animate-pulse"></div>
          <div className="flex flex-col gap-1 w-full">
            <div className="bg-zinc-100 h-[15px] w-full animate-pulse"></div>
            <div className="bg-zinc-100 h-[15px] w-full animate-pulse"></div>
          </div>
        </div>

        <div className="sm:w-[120px] sm:h-[120px] w-[90px] h-[90px] rounded-sm bg-zinc-100 animate-pulse" />
      </div>
      <div className="w-full flex justify-between mt-8">
        <div className="bg-zinc-100 h-[20px] lg:w-[150px] w-[100px] animate-pulse"></div>
        <div className="flex items-center sm:gap-16 gap-6 text-2xl text-virgoolText-600">
          <button className="bg-zinc-100 w-[30px] h-[15px] animate-pulse"></button>
          <button className="bg-zinc-100 w-[30px] h-[15px] animate-pulse"></button>
          <button className="bg-zinc-100 w-[30px] h-[15px] animate-pulse"></button>
        </div>
      </div>
    </div>
  );
}
