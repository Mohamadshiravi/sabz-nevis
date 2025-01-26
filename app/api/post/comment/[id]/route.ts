import ConnectToDB from "@/DB/connectToDB";
import { commentModel } from "@/models";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    await ConnectToDB();

    const comment = await commentModel.findOne({ _id: params.id });
    const isUserliked = comment.likes.some(
      (e: string) => e.toString() === isUserAuth._id.toString()
    );

    if (isUserliked) {
      return Response.json({ message: "user liked" }, { status: 400 });
    }

    await commentModel.findOneAndUpdate(
      { _id: params.id },
      { $push: { likes: isUserAuth._id } }
    );

    return Response.json({ message: "comment liked" });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
