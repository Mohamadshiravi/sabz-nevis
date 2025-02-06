import DesktopNavbar from "@/components/module/dekstopNavbar";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import { categoryModel } from "@/models";
import IsUserAuthentication from "@/utils/auth/authUser";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { GoPaperclip } from "react-icons/go";

export default async function PodcastLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const userData = await IsUserAuthentication();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  const category = await categoryModel.findById(params.id, "name -_id");

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <main
        className={`${
          userData
            ? "lg:px-0 px-4 grid lg:grid-cols-[2fr_7fr_3fr] grid-cols-[1fr] gap-10"
            : "md:px-20 px-4 grid lg:grid-cols-[8fr_4fr] grid-cols-[1fr] lg:gap-32 gap-10"
        }`}
      >
        {userData && <DesktopNavbar />}
        <section className="w-full overflow-hidden pb-20">
          <div className="mt-20 flex items-center gap-4">
            <span className="bg-zinc-200 dark:bg-darkColor-700 p-2 rounded-full text-2xl text-zinc-400">
              <GoPaperclip />
            </span>
            <p className="vazir-bold text-2xl">{category.name}</p>
          </div>

          <div className="select-none w-full text-sm flex items-center gap-3 border-b border-zinc-200 dark:border-b-zinc-700 mt-14">
            <button
              className={`text-myText-800 dark:text-white vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-myText-800 dark:after:bg-white pb-2 px-2 text-nowrap relative transition`}
            >
              جدیدترین ها
            </button>
          </div>

          {children}
        </section>
        <Footer />
      </main>
      <MobileNavbar />
    </>
  );
}
