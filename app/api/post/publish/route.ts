import postModel from "@/models/post";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { postID } = await req.json();

    const updatedPost = await postModel.findOneAndUpdate(
      { _id: postID },
      {
        status: "completed",
      }
    );
    return Response.json({ message: "post published", id: updatedPost._id });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
