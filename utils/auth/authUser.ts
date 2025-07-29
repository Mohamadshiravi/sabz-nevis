import { cookies } from "next/headers";
import { VerifyAccessToken } from "./tokenControl";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";

export default async function IsUserAuthentication() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return false;
    }

    const isTokenValid = VerifyAccessToken(token);
    if (!isTokenValid) {
      return false;
    }

    await ConnectToDB();
    const user = await userModel.findOne(
      { phone: isTokenValid.phone },
      "phone"
    );
    if (!user) {
      return false;
    }
    return user;
  } catch (_) {
    return false;
  }
}
