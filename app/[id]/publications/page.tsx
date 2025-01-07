import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import PrimaryBtn from "@/components/module/primaryBtn";
import ProfileNavbar from "@/components/template/profile/profileNavbar";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus, FaRss } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default async function MainProfileSction({
  params,
}: {
  params: { id: string };
}) {
  await ConnectToDB();
  const decodedUserId = decodeURIComponent(params.id).slice(1);
  const isAnyUserExist = await userModel.findOne(
    { username: decodedUserId },
    "phone displayName username about -_id"
  );
  if (!isAnyUserExist) {
    notFound();
  }

  let isUserLogedIn = null;
  let isUserHere = null;
  const token = cookies().get("token")?.value;
  if (token) {
    const isTokenValid = VerifyAccessToken(token);
    if (isTokenValid) {
      isUserLogedIn = true;
      if (isTokenValid.phone === isAnyUserExist.phone) {
        isUserHere = true;
      }
    }
  }
  return (
    <>
      <section className="bg-virgoolText-200 dark:bg-darkColor-700 border-b-2 border-zinc-200 dark:border-b-zinc-700">
        <section className="flex flex-col items-center mt-4 gap-2">
          <img
            src="/images/avatar-default.webp"
            className="rounded-full w-[90px] aspect-square object-cover"
          />
          <h1 className="vazir-black text-xl">
            {isAnyUserExist.displayName || isAnyUserExist.username}
          </h1>
          <h3 className="text-sm dark:text-virgoolText-400 px-4 overflow-hidden w-full text-center md:w-[400px] w-full">
            {isAnyUserExist.about}
          </h3>
          <div className="flex items-center mt-3 gap-10 text-sm text-virgoolText-600 dark:text-virgoolText-400">
            <h4>
              توسط <span className="text-black dark:text-white">0</span> نفر
              دنبال میشود
            </h4>
            <h4>
              <span className="text-black dark:text-white">0</span> نفر را دنبال
              میکند
            </h4>
          </div>
          {!isUserHere ? (
            <button className="text-sm flex items-center gap-4 mt-4 px-16 py-1.5 transition vazir-bold bg-virgoolBlue hover:bg-virgoolBlueHover rounded-full text-white">
              دنبال کنید
              <FaPlus />
            </button>
          ) : (
            <button className="text-sm mt-4 vazir-bold hover:bg-zinc-700 hover:text-white transition px-16 py-1.5 border-2 border-zinc-700 text-zinc-700 dark:border-zinc-300 dark:text-zinc-300 dark:hover:bg-zinc-300 dark:hover:text-zinc-800 rounded-full">
              تنظیمات حساب کاربری
            </button>
          )}
          <div className="flex items-center justify-center gap-3 mt-2">
            {!isUserHere && isUserLogedIn && (
              <div className="relative">
                <input
                  id="blockBox"
                  type="checkbox"
                  className="absolute peer w-0 h-0"
                />
                <label
                  htmlFor="blockBox"
                  className="block cursor-pointer bg-zinc-200 text-zinc-500 text-xl px-6 py-1.5 rounded-full"
                >
                  <BsThreeDots />
                </label>
                <div className="after:content-[''] after:w-[10px] after:h-[10px] after:absolute after:-top-1 after:left-[90px] after:border-t after:border-l after:bg-white after:rotate-45 w-[200px] hidden peer-checked:block rounded-sm z-10 top-10 -left-16 shadow-lg absolute bg-white text-sm text-virgoolText-600">
                  <button className="py-4 px-6">بلاک کاربر</button>
                </div>
              </div>
            )}

            <button className="bg-zinc-500 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center">
              <FaRss className="text-[15px]" />
            </button>
          </div>
        </section>
        <ProfileNavbar
          username={JSON.parse(JSON.stringify(isAnyUserExist.username || null))}
        />
      </section>
      <section className="pt-12 pb-24 bg-white dark:bg-darkColor-800">
        <div className="flex flex-col items-center mt-12 gap-3 px-4 md:text-right text-center">
          {isUserHere ? (
            <>
              <h4>
                شما هنوز انتشاراتی در ویرگول نساخته اید. همین حالا اقدام به ساخت
                اولین انتشارات خود کنید.
              </h4>
              <PrimaryBtn>
                ساخت انتشارات
                <IoIosArrowBack />
              </PrimaryBtn>
            </>
          ) : (
            <h4>
              <span className="vazir-bold px-1">
                {isAnyUserExist.displayName || "این کاربر"}
              </span>{" "}
              هنوز انتشاراتی در ویرگول نساخته بعد از ساخت اولین انتشارات آن را
              در اینجا نمایش می‌دهیم.
            </h4>
          )}
        </div>
      </section>
    </>
  );
}
