export default function PostLoading() {
  return (
    <section>
      <div className="bg-zinc-100 dark:bg-zinc-800 w-full h-[60px] animate-pulse"></div>
      <section className="grid lg:grid-cols-[8.5fr_3.5fr]">
        <div className="md:px-20 px-4 md:py-12 py-4 w-full">
          <div className="flex h-[50px] gap-4">
            <div className="bg-zinc-100 dark:bg-zinc-800 h-[50px] w-[50px] rounded-full animate-pulse"></div>
            <div className="flex flex-col justify-between h-full">
              <div className="bg-zinc-100 dark:bg-zinc-800 h-[20px] w-[100px] animate-pulse"></div>
              <div className="bg-zinc-100 dark:bg-zinc-800 h-[20px] w-[150px] animate-pulse"></div>
            </div>
          </div>
          <div className="bg-zinc-100 h-[70px] dark:bg-zinc-800 w-full mt-8 animate-pulse"></div>
          <div className="bg-zinc-100 h-[35px] dark:bg-zinc-800 w-full mt-3 animate-pulse"></div>
          <div className="bg-zinc-100 h-[35px] dark:bg-zinc-800 w-full mt-3 animate-pulse"></div>
          <div className="bg-zinc-100 h-[35px] dark:bg-zinc-800 w-full mt-3 animate-pulse"></div>
          <div className="bg-zinc-100 h-[35px] dark:bg-zinc-800 w-full mt-3 animate-pulse"></div>
        </div>
        <div className="w-full lg:block hidden px-6 md:py-12 py-6">
          <div className="bg-zinc-100 h-[100px] dark:bg-zinc-800 w-[100px] rounded-full animate-pulse"></div>
          <div className="bg-zinc-100 h-[25px] dark:bg-zinc-800 w-[100px] animate-pulse mt-4"></div>
          <div className="bg-zinc-100 h-[20px] dark:bg-zinc-800 w-[100px] animate-pulse mt-4"></div>
          <div className="bg-zinc-100 h-[45px] dark:bg-zinc-800 w-[200px] animate-pulse mt-4"></div>
          <div className="bg-zinc-100 h-[40px] dark:bg-zinc-800 w-[180px] rounded-full animate-pulse mt-2"></div>
        </div>
      </section>
    </section>
  );
}
