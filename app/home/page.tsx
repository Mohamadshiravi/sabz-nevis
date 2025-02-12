import MainSectionPosts from "@/components/template/main/mainSectionPosts";
import Link from "next/link";

export default async function Home() {
  return (
    <section className="w-full sm:py-8 pt-8 pb-20 flex flex-col gap-8">
      <MainSectionPosts />
      <div className="bg-myGreen-600 rounded-md px-4 text-center py-3 text-emerald-950 flex flex-col items-center gap-3">
        تا الان همین قدر بیشتر مقاله توی وبسایت ما نوشته نشده اگر دوست داری
        میتونی تو هم یک مقاله جدید بنویسی {"(:"}
        <Link href={"/post/create"} className="vazir-bold text-white text-sm">
          نوشتن پست جدید
        </Link>
      </div>
    </section>
  );
}
