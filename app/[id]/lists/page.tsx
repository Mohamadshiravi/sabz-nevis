import List from "@/components/module/me/list";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";

export default async function ListsProfileSction({
  params,
}: {
  params: { id: string };
}) {
  await ConnectToDB();
  const decodedUserId = decodeURIComponent(params.id).slice(1);
  const theUserProfile = await userModel.findOne({ username: decodedUserId });

  let isUserLogedIn = null;
  let isUserHere = null;
  const token = cookies().get("token")?.value;
  if (token) {
    const isTokenValid = VerifyAccessToken(token);
    if (isTokenValid) {
      isUserLogedIn = true;
      if (isTokenValid.phone === theUserProfile.phone) {
        isUserHere = true;
      }
    }
  }
  return (
    <div className="flex lg:w-[800px] md:w-[600px] w-full flex-col md:px-0 px-6 items-center m-auto gap-3 md:text-right text-center md:text-base text-sm">
      <List />
    </div>
  );
}
