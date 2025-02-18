import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return Response.json({ message: "unAuth" }, { status: 401 });
    }

    const isTokenValid = VerifyAccessToken(token);
    if (!isTokenValid) {
      return Response.json({ message: "unAuth" }, { status: 401 });
    }

    await ConnectToDB();
    const user = await userModel.findOne({ phone: isTokenValid.phone }, "-__v");
    if (!user) {
      return Response.json({ message: "unAuth" }, { status: 401 });
    }
    return Response.json({ user });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
