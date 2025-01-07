import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { ReactNode } from "react";

export default async function UserProfilePage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <main className="bg-virgoolText-200 dark:bg-darkColor-700">
        <Header isTransparent />
        {children}
      </main>
      <MobileNavbar />
    </>
  );
}
export async function generateMetadata({ params }: { params: { id: string } }) {
  await ConnectToDB();
  const decodedUserId = decodeURIComponent(params.id).slice(1);
  const isAnyUserExist = await userModel.findOne(
    { username: decodedUserId },
    "displayName username -_id"
  );

  return {
    title: `${isAnyUserExist.displayName || `پروفایل کاربر`} - ویرگول`,
  };
}
