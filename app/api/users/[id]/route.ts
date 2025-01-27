import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectToDB();

    const user = await userModel.findOne(
      { username: params.id },
      "phone displayName"
    );

    return Response.json({ user });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
