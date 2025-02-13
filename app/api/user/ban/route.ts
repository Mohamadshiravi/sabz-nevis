import ConnectToDB from "@/DB/connectToDB";
import banUserModel from "@/models/banuser";

export async function GET(req: Request) {
  try {
    await ConnectToDB();
    const banUsers = await banUserModel.find({}, "-__v");

    return Response.json({ banUsers });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
