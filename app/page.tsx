import ADSection from "@/components/module/adSection";
import DesktopNavbar from "@/components/module/desktopNavbar";
import Post from "@/components/module/post";
import HomeBanner from "@/components/template/homeBanner";
import SugestionsPeople from "@/components/template/main/sugestPeople";
import TopPosts from "@/components/template/main/topPosts";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <main className="md:px-20 px-4 grid lg:grid-cols-[8fr_4fr] grid-cols-[1fr] gap-32">
        <section className="w-full sm:py-14 py-8 flex flex-col gap-8">
          <Post />
          <ADSection />
          <Post border />
          <Post />
          <TopPosts />
          <Post border />
          <Post border />
          <Post />
          <SugestionsPeople />
          <Post border />
          <Post border />
          <Post border />
        </section>
        <DesktopNavbar />
      </main>
    </>
  );
}
