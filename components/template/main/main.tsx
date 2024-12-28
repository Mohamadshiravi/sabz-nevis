import ADSection from "@/components/module/adSection";
import Post from "@/components/module/post";
import TopPosts from "./topPosts";
import SugestionsPeople from "./sugestPeople";
import InfiniteScrollSection from "./infiniteScrollSection";
import { AiOutlinePlus } from "react-icons/ai";
import { useTypedSelector } from "@/redux/typedHooks";

export default function MainSection() {
  const userData = useTypedSelector((state) => {
    return state.user;
  });
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
      <Post />
      <ADSection />
      <Post border />
      <Post />
      <TopPosts />
      <Post border />
      <Post border />
      <Post />
      <SugestionsPeople />
      <InfiniteScrollSection />
    </section>
  );
}
