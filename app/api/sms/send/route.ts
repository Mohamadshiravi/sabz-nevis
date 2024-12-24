import ConnectToDB from "@/DB/connectToDB";
import otpModel from "@/models/otp";

const request = require("request");

export async function POST(req: Request) {
  const { phoneNum } = await req.json();

  const randomCode = Math.floor(100000 + Math.random() * 900000);

  try {
    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: "mohamad85",
          pass: "MTshirav1",
          fromNum: "3000505",
          toNum: phoneNum,
          patternCode: "wd0jbf2gn3av97x",
          inputData: [{ "verification-code": randomCode }],
        },
        json: true,
      },
      async function (error: any, response: any, body: any) {
        if (!error && response.statusCode === 200) {
          await ConnectToDB();

          await otpModel.create({
            phone: phoneNum,
            code: randomCode,
            expTime: new Date().getTime() + 120000,
          });
        } else {
          throw new Error("code not send");
        }
      }
    );
    return Response.json(
      { message: "Code send successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "code not send" }, { status: 500 });
  }
}
