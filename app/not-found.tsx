import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-9xl font-bold text-my-green-600">404</h1>
      <p className="my-4 text-xl text-my-text-600 vazir-bold">
        صفحه موردنظر شما در سبز نویس پیدا نشد!
      </p>
      <Link
        href={"/home"}
        className={`text-sm w-[200px] cursor-pointer vazir-medium flex items-center justify-center gap-2 hover:bg-zinc-700 hover:text-white transition px-4 h-[35px] border-2 border-zinc-700 text-zinc-700 dark:border-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-800 rounded-full`}
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
