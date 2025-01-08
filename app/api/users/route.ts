import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";

export async function GET(req: Request) {
  try {
    await ConnectToDB();
    const allUsers = await userModel.find();
    return Response.json({ data: allUsers });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
