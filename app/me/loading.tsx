export default function MeLoading() {
  return (
    <section className="w-full">
      <div className="w-full h-[60px] bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
      <main
        className={`lg:px-0 px-4 grid lg:grid-cols-[2fr_7fr_3fr] grid-cols-[1fr] gap-6`}
      >
        <div className="w-full lg:flex hidden border-l border-zinc-200 dark:border-zinc-800 h-screen py-14 px-8 flex-col gap-4">
          <div className="w-full h-[40px] bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
          <div className="w-full h-[40px] bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
          <div className="w-full h-[40px] bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
          <div className="w-full h-[40px] bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
          <div className="w-full h-[40px] bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
        </div>
        <div className="flex flex-col lg:items-normal items-center py-20">
          <div className="w-[300px] h-[60px] bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>

          <div className="w-full lg:h-[500px] h-[350px] bg-zinc-200 animate-pulse dark:bg-zinc-800 mt-12"></div>
        </div>
        <div className="py-20 lg:block hidden border-r border-zinc-200 animate-pulse dark:border-zinc-800 h-screen px-8">
          <div className="flex items-center gap-3">
            <div className="w-[30px] h-[30px] rounded-full bg-zinc-200 animate-pulse animate-pulse dark:bg-zinc-800"></div>
            <div className="w-[200px] h-[40px] bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
          </div>
          <div className="flex items-center flex-wrap gap-2 p-2 grow mt-3 w-full">
            <div className="w-[90px] h-[30px] rounded-md bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
            <div className="w-[90px] h-[30px] rounded-md bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
            <div className="w-[90px] h-[30px] rounded-md bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
            <div className="w-[90px] h-[30px] rounded-md bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
            <div className="w-[90px] h-[30px] rounded-md bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
            <div className="w-[90px] h-[30px] rounded-md bg-zinc-200 animate-pulse dark:bg-zinc-800"></div>
          </div>
        </div>
      </main>
      <div className="fixed lg:hidden block left-0 bottom-0 w-full h-[60px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
    </section>
  );
}
