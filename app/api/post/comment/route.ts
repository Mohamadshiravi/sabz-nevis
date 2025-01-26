import commentModel from "@/models/comment";
import postModel from "@/models/post";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { postId, name, body, avatar } = await req.json();

    const comments = await commentModel.create({
      post: postId,
      name,
      body,
      avatar,
      status: "queued",
    });

    await postModel.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: comments._id },
      }
    );

    return Response.json({ message: "comment added" }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
