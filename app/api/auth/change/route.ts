import ConnectToDB from "@/DB/connectToDB";
import otpModel from "@/models/otp";
import userModel from "@/models/user";
import IsUserAuthentication from "@/utils/auth/authUser";
import {
  JenerateAccessToken,
  VerifyAccessToken,
} from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  const { phone, code } = await req.json();

  await ConnectToDB();

  try {
    const isPhoneExist = await otpModel.findOne({ phone });

    if (!isPhoneExist) {
      return Response.json({ message: "phone not true" }, { status: 409 });
    }

    if (+isPhoneExist.code !== +code) {
      return Response.json({ message: "code not true" }, { status: 410 });
    }

    const DateNow = new Date().getTime();
    if (+DateNow > +isPhoneExist.expTime) {
      return Response.json({ message: "code Expired" }, { status: 410 });
    }

    await otpModel.findOneAndDelete({ _id: isPhoneExist._id });

    //Change user phone
    const oldToken = cookies().get("token")?.value;
    let oldPhone = null;
    if (typeof oldToken === "string") {
      const verifyToken = VerifyAccessToken(oldToken);
      if (verifyToken) {
        oldPhone = verifyToken.phone;
      }
    }

    await userModel.findOneAndUpdate({ phone: oldPhone }, { phone });
    const token = JenerateAccessToken({ phone });

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return Response.json({ message: "number changed" }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
