import { postModel } from "@/models/index";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { postID, cover, desc, readingTime, category, title } =
      await req.json();

    const currentPost = await postModel
      .findOne({ _id: postID }, "-_id user")
      .populate("user", "phone");

    if (currentPost.user.phone !== isUserAuth.phone) {
      return Response.json(
        { message: "you dont have Access" },
        { status: 403 }
      );
    }

    const updatedPost = await postModel.findOneAndUpdate(
      { _id: postID },
      { status: "completed", postID, cover, desc, readingTime, category, title }
    );
    return Response.json({ message: "post published", id: updatedPost._id });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const isUserAuth = await IsUserAuthentication();

  try {
    if (!isUserAuth) {
      return Response.json({ message: "user unAuth" }, { status: 401 });
    }
    const publishPosts = await postModel
      .find({ user: isUserAuth._id, status: "completed" }, "title updatedAt")
      .populate("user", "username")
      .sort({ createdAt: -1 });

    return Response.json({ publishPosts });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
