import ConnectToDB from "@/DB/connectToDB";
import postModel from "@/models/post";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectToDB();

    const post = await postModel.findOne({ _id: params.id });
    if (post) {
      return Response.json({ post });
    } else {
      return Response.json({ message: "not found" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
