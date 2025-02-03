import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import FollowBtn from "@/components/template/profile/followBtn";
import ProfileFollowDetails from "@/components/template/profile/profileFollowDetails";
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
    "phone displayName username about avatar followers following"
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
            <ProfileFollowDetails
              followers={JSON.parse(JSON.stringify(isAnyUserExist.followers))}
              following={JSON.parse(JSON.stringify(isAnyUserExist.following))}
              userId={JSON.parse(JSON.stringify(isAnyUserExist._id))}
            />
            <FollowBtn
              id={JSON.parse(JSON.stringify(isAnyUserExist._id))}
              isUserHere={JSON.parse(JSON.stringify(isUserHere))}
            />
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
