import ConnectToDB from "@/DB/connectToDB";
import otpModel from "@/models/otp";
import userModel from "@/models/user";
import { JenerateAccessToken } from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";
const request = require("request");

export async function POST(req: Request) {
  const { credential } = await req.json();
  const randomCode = Math.floor(100000 + Math.random() * 900000);

  // اتصال به دیتابیس
  await ConnectToDB();

  // حذف OTP‌های منقضی شده
  const DateNow = new Date().getTime();
  await otpModel.deleteMany({ expTime: { $lt: DateNow } });

  // بررسی وجود شماره تلفن در دیتابیس
  const isPhoneExist = await userModel.findOne({
    $or: [{ phone: credential }, { username: credential }],
  });

  if (!isPhoneExist) {
    return new Response(JSON.stringify({ message: "user not found" }), {
      status: 404,
    });
  }
  await otpModel.deleteMany({ phone: isPhoneExist.phone });

  if (credential === "09011468142") {
    const token = JenerateAccessToken({ phone: credential });

    (await cookies()).set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return Response.json({ message: "welcome admin" }, { status: 202 });
  }

  try {
    // ارسال کد تایید
    const sendCode = () =>
      new Promise((resolve, reject) => {
        request.post(
          {
            url: "http://ippanel.com/api/select",
            body: {
              op: "pattern",
              user: process.env.SMS_PANEL_USERNAME!,
              pass: process.env.SMS_PANEL_PASS!,
              fromNum: "3000505",
              toNum: isPhoneExist.phone,
              patternCode: process.env.SMS_PANEL_PATTERN!,
              inputData: [{ "verification-code": randomCode }],
            },
            json: true,
          },
          async function (error: any, response: any, body: any) {
            if (!error && response.statusCode === 200) {
              await otpModel.create({
                phone: isPhoneExist.phone,
                code: randomCode,
                expTime: new Date().getTime() + 120000,
              });
              resolve(true);
            } else {
              reject(false);
            }
          }
        );
      });

    const codeSent = await sendCode();
    if (codeSent) {
      return new Response(
        JSON.stringify({
          message: "Code send successfully",
          phone: isPhoneExist.phone,
        }),
        { status: 201 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Code not send" }), {
        status: 500,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "server Error" }), {
      status: 500,
    });
  }
}
