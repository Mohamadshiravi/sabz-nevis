import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import PrimaryBtn from "@/components/module/primaryBtn";
import userModel from "@/models/user";
import { notFound } from "next/navigation";
import { FaRss } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const decodedUserId = decodeURIComponent(params.id).slice(1);
  const isAnyUserExist = await userModel.findOne({ username: decodedUserId });
  if (!isAnyUserExist) {
    notFound();
  }
  return (
    <>
      <main>
        <section className="bg-virgoolText-200 border-b-2 border-zinc-200">
          <Header isTransparent />
          <section className="flex flex-col items-center mt-4 gap-2">
            <img
              src="/images/avatar-default.webp"
              className="rounded-full w-[90px] aspect-square object-cover"
            />
            <h1 className="vazir-black text-xl">
              {isAnyUserExist.displayName}
            </h1>
            <h3 className="text-virgoolText-800 text-sm px-4 overflow-hidden w-full text-center">
              {isAnyUserExist.about}
            </h3>
            <div className="flex items-center mt-3 gap-10 text-sm text-virgoolText-600">
              <h4>
                توسط <span className="text-black">0</span> نفر دنبال میشود
              </h4>
              <h4>
                <span className="text-black">0</span> نفر را دنبال میکند
              </h4>
            </div>
            <button className="text-sm mt-4 vazir-bold hover:bg-zinc-700 hover:text-white transition px-16 py-1.5 border-2 border-zinc-700 text-zinc-700 dark:border-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-800 rounded-full">
              تنظیمات حساب کاربری
            </button>
            <button className="bg-zinc-500 mt-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center">
              <FaRss className="text-[15px]" />
            </button>
          </section>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-virgoolText-600 vazir-light">
            <button className="py-2 relative text-black vazir-regular after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[1.5px] after:bg-virgoolText-800 dark:after:bg-white">
              پست ها
            </button>
            <button className="py-2">لیست ها</button>
            <button className="py-2">انتشارات</button>
          </div>
        </section>
        <section>
          <div className="flex flex-col items-center mt-12 gap-3 px-4 md:text-right text-center md:text-base text-sm">
            <h4>
              شما هنوز پستی در ویرگول ننوشته‌اید. همین حالا اقدام به نوشتن اولین
              پست خود کنید.
            </h4>
            <PrimaryBtn>
              نوشتن پست
              <IoIosArrowBack />
            </PrimaryBtn>
          </div>
        </section>
      </main>
      <MobileNavbar />
    </>
  );
}
