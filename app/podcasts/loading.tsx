export default function podcatsLoading() {
  return (
    <section className="w-full py-14">
      <div className="bg-zinc-100 dark:bg-zinc-800 h-[40px] w-full"></div>
      <div className="flex items-center justify-between mt-8">
        <div className="bg-zinc-100 dark:bg-zinc-800 h-[50px] w-[200px]"></div>
        <div className="bg-zinc-100 dark:bg-zinc-800 h-[40px] w-[110px] rounded-full"></div>
      </div>
      <div className="flex justify-end w-full mt-8">
        <div className="bg-zinc-100 dark:bg-zinc-800 h-[40px] w-[110px]"></div>
      </div>
      <div className="grid sm:grid-cols-[6fr_6fr] gap-8 mt-8">
        {Array.from({ length: 8 }).map((e, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="bg-zinc-100 dark:bg-zinc-800 h-[100px] w-[150px]"></div>
            <div className="flex flex-col gap-2 w-full">
              <div className="bg-zinc-100 dark:bg-zinc-800 h-[30px] w-full"></div>
              <div className="bg-zinc-100 dark:bg-zinc-800 h-[15px] w-full"></div>
              <div className="bg-zinc-100 dark:bg-zinc-800 h-[15px] w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
