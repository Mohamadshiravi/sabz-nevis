import MainSectionPosts from "@/components/template/main/mainSectionPosts";

export default async function Home() {
  return (
    <section className="w-full sm:py-8 pt-8 pb-20 flex flex-col gap-8">
      <MainSectionPosts />
    </section>
  );
}
