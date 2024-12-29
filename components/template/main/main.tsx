import { AiOutlinePlus } from "react-icons/ai";
import { UserModelType } from "@/models/user";
import MainSectionPosts from "./mainSectionPosts";

export default function MainSection({ userData }: { userData: UserModelType }) {
  return (
    <section className="w-full sm:py-14 py-8 flex flex-col gap-8">
      {userData && (
        <div className="flex items-center gap-5 border-b-2 border-zinc-300">
          <AiOutlinePlus className="text-xl mb-2" />

          <div className="pb-2 vazir-medium px-2 relative text-virgoolText-800 after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-virgoolText-800">
            برای شما
          </div>
          <div className="pb-2 vazir-medium px-2 text-virgoolText-600 flex items-center gap-2">
            دوستان
            <span className="text-white bg-virgoolBlue text-[10px] px-2 py-[2px] rounded-sm">
              جدید
            </span>
          </div>
          <div className="pb-2 vazir-medium px-2 text-virgoolText-600">
            جدیدترین ها
          </div>
        </div>
      )}
      <MainSectionPosts />
    </section>
  );
}
