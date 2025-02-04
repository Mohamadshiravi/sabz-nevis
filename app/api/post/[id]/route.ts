import ConnectToDB from "@/DB/connectToDB";
import { postModel } from "@/models/index";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    await ConnectToDB();

    const post = await postModel.findOne({ _id: params.id });
    if (post) {
      if (post.user.toString() !== isUserAuth._id.toString()) {
        return Response.json({ message: "forbidden" }, { status: 403 });
      }

      return Response.json({ post });
    } else {
      return Response.json({ message: "not found" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
