import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";

export async function DELETE() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return false;
    }

    const isTokenValid = VerifyAccessToken(token);
    if (!isTokenValid) {
      return false;
    }

    await ConnectToDB();
    await userModel.findOneAndDelete({ phone: isTokenValid.phone });
    return Response.json({ message: "user deleted" });
  } catch (error) {
    return Response.json({ message: "error" }, { status: 500 });
  }
}
