import ConnectToDB from "@/DB/connectToDB";
import otpModel from "@/models/otp";
import userModel from "@/models/user";
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

  try {
    // ارسال کد تایید
    const sendCode = () =>
      new Promise((resolve, reject) => {
        request.post(
          {
            url: "http://ippanel.com/api/select",
            body: {
              op: "pattern",
              user: "mohamad85",
              pass: "MTshirav1",
              fromNum: "3000505",
              toNum: isPhoneExist.phone,
              patternCode: "wd0jbf2gn3av97x",
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
