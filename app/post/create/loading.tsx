export default function PostEditorLoading() {
  return (
    <section className="lg:w-[1024px] lg:m-auto w-full">
      <div className="h-[90px] w-full bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="mt-10 mb-20 w-full flex flex-col lg:px-28 px-4">
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[70px] animate-pulse"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-14"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-2"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-2"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-2"></div>
        <div className="bg-zinc-200 dark:bg-zinc-800 w-full h-[40px] animate-pulse mt-2"></div>
      </div>
    </section>
  );
}
