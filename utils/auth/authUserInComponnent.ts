import { cookies } from "next/headers";
import { VerifyAccessToken } from "./tokenControl";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";

export default async function IsUserLogedIn() {
  const token = cookies().get("token")?.value;
  if (!token) {
    return false;
  }

  const isTokenValid = VerifyAccessToken(token);
  if (!isTokenValid) {
    return false;
  }

  await ConnectToDB();
  const isUserExist = await userModel.findOne(
    {
      phone: isTokenValid.phone,
    },
    "-_id phone"
  );
  if (!isUserExist) {
    return false;
  }

  return { phone: isUserExist.phone };
}
