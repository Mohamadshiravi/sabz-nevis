import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function UserProfilePage(
  props: {
    params: Promise<{ username: string }>;
    children: ReactNode;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

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
