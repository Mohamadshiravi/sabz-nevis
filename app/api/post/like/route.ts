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
          $push: { likes: isUserAuth._id },
        },
        { new: true }
      )
      .populate("user", "displayName username avatar");

    return Response.json({ message: "post liked", post }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
export async function GET(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const posts = await postModel
      .find(
        {
          likes: { $in: [isUserAuth._id] },
        },
        "-__v -updatedAt -imagesUrl -imagesID -status -body"
      )
      .populate("user", "avatar displayName username");

    console.log(posts);

    return Response.json({ message: "liked post", posts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
