import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

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
    "_id"
  );

  if (!isAnyUserExist) {
    notFound();
  }

  return children;
}
