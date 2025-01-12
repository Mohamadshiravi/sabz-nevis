import MainSectionPosts from "@/components/template/main/mainSectionPosts";
import IsUserAuthentication from "@/utils/auth/authUser";
import { AiOutlinePlus } from "react-icons/ai";

export default async function Home() {
  const userData = await IsUserAuthentication();

  return (
    <section className="w-full sm:py-14 py-8 flex flex-col gap-8">
      {userData && (
        <div className="flex items-center gap-5 border-b-2 border-zinc-300 dark:border-zinc-700 text-sm">
          <AiOutlinePlus className="text-xl mb-2" />

          <div className="pb-2 px-2 relative text-virgoolText-800 dark:text-white after:content-[''] after:absolute after:w-full after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-virgoolText-800 dark:after:bg-white">
            برای شما
          </div>
          <div className="pb-2 px-2 text-virgoolText-600 dark:text-virgoolText-500 flex items-center gap-2">
            دوستان
            <span className="text-white bg-myGreen-600 text-[10px] px-2 py-[2px] rounded-sm">
              جدید
            </span>
          </div>
          <div className="pb-2 px-2 text-virgoolText-600 dark:text-virgoolText-500">
            جدیدترین ها
          </div>
        </div>
      )}
      <MainSectionPosts />
    </section>
  );
}
