import ConnectToDB from "@/DB/connectToDB";
import otpModel from "@/models/otp";
import userModel from "@/models/user";
import { JenerateAccessToken } from "@/utils/TokenControl";
import { cookies } from "next/headers";

export async function POST(req: Request) {
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

    //jenerate Token and create user
    const newUser = await userModel.create({ phone });
    const token = JenerateAccessToken({ phone: newUser.phone });

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return Response.json({ message: "userCreated" }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
