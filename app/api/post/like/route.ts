import { postModel } from "@/models";
import IsUserAuthentication from "@/utils/auth/authUser";

export const revalidate = 0;

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { postId } = await req.json();

    const checkPost = await postModel.findById(postId);

    if (
      checkPost.likes.some(
        (e: any) => e.toString() === isUserAuth._id.toString()
      )
    ) {
      await postModel.findOneAndUpdate(
        { _id: postId },
        {
          $pull: { likes: isUserAuth._id },
        }
      );
    } else {
      await postModel.findOneAndUpdate(
        { _id: postId },
        {
          $push: { likes: isUserAuth._id },
        }
      );
    }

    const post = await postModel
      .findById({ _id: postId })
      .populate("user", "displayName username avatar")
      .populate("category", "-__v");

    return Response.json(
      { message: "post like toggled", post },
      { status: 200 }
    );
  } catch (error) {
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
      .populate("user", "avatar displayName username")
      .populate("category", "-__v");

    return Response.json({ message: "liked post", posts }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
