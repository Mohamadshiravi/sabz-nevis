import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";

export async function GET(req: Request) {
  try {
    await ConnectToDB();
    const allUsers = await userModel.find({}, "avatar username displayName");

    return Response.json({ users: allUsers });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
