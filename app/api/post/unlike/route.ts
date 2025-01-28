import { postModel } from "@/models";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { postId } = await req.json();

    const post = await postModel
      .findOneAndUpdate(
        { _id: postId },
        {
          $pull: { likes: isUserAuth._id },
        },
        { new: true }
      )
      .populate("user", "displayName username avatar");

    return Response.json({ error: "post unliked", post }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
