import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import FollowBtn from "@/components/template/profile/followBtn";
import ProfileNavbar from "@/components/template/profile/profileNavbar";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import IsUserAuthentication from "@/utils/auth/authUser";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRss } from "react-icons/fa";

export default async function UserProfilePage({
  params,
  children,
}: {
  params: { username: string };
  children: ReactNode;
}) {
  await ConnectToDB();
  const decodedUserId = decodeURIComponent(params.username).slice(1);
  const isAnyUserExist = await userModel.findOne(
    { username: decodedUserId },
    "phone displayName username about avatar"
  );
  if (!isAnyUserExist) {
    notFound();
  }

  const isUserLogedIn = await IsUserAuthentication();
  let isUserHere = false;

  if (isUserLogedIn && isUserLogedIn.phone === isAnyUserExist.phone) {
    isUserHere = true;
  }
  return (
    <>
      <main className="bg-myText-200 dark:bg-darkColor-700">
        <Header isTransparent />
        <section className="border-b-2 border-zinc-200 dark:border-b-zinc-700">
          <section className="flex flex-col items-center mt-4 gap-2">
            <Image
              width={800}
              height={800}
              alt={"user avatar"}
              src={isAnyUserExist.avatar || "/images/guest-avatar.webp"}
              className="rounded-full w-[90px] aspect-square object-cover"
            />
            <h1 className="vazir-black text-xl">
              {isAnyUserExist.displayName || isAnyUserExist.username}
            </h1>
            <h3 className="text-sm dark:text-myText-400 px-4 overflow-hidden w-full text-center md:w-[400px] w-full">
              {isAnyUserExist.about}
            </h3>
            <div className="flex items-center mt-3 gap-10 text-sm text-myText-600 dark:text-myText-400">
              <h4>
                توسط <span className="text-black dark:text-white">0</span> نفر
                دنبال میشود
              </h4>
              <h4>
                <span className="text-black dark:text-white">0</span> نفر را
                دنبال میکند
              </h4>
            </div>
            <FollowBtn id={isAnyUserExist._id} isUserHere={isUserHere} />
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
                  <div className="after:content-[''] after:w-[10px] after:h-[10px] after:absolute after:-top-1 after:left-[90px] after:border-t after:border-l after:bg-white after:rotate-45 w-[200px] hidden peer-checked:block rounded-sm z-10 top-10 -left-16 shadow-lg absolute bg-white text-sm text-myText-600">
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
            username={JSON.parse(
              JSON.stringify(isAnyUserExist.username || null)
            )}
          />
        </section>
        {children}
      </main>
      <MobileNavbar />
    </>
  );
}
export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  await ConnectToDB();
  const decodedUserId = decodeURIComponent(params.username).slice(1);
  const isAnyUserExist = await userModel.findOne(
    { username: decodedUserId },
    "displayName username -_id"
  );

  return {
    title: `${isAnyUserExist.displayName || `پروفایل کاربر`} - سبزنویس`,
  };
}
