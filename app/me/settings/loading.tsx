export default function HomeLoading() {
  return (
    <>
      <div className="flex flex-col w-full gap-8 mt-10">
        {Array.from({ length: 6 }).map((e, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="bg-zinc-100 dark:bg-zinc-800 w-[90px] h-[35px]"></div>
            <div className="bg-zinc-100 dark:bg-zinc-800 w-[150px] h-[30px]"></div>
          </div>
        ))}
      </div>
    </>
  );
}
