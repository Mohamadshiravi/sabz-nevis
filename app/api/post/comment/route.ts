import commentModel from "@/models/comment";
import postModel from "@/models/post";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { postId, body, replyTo } = await req.json();

    if (replyTo) {
      const reply = await commentModel.create({
        post: postId,
        user: isUserAuth._id,
        body,
        status: "queued",
        replyTo,
      });

      await commentModel.findOneAndUpdate(
        { _id: replyTo },
        {
          $push: { replies: reply._id },
        }
      );
    } else {
      const comments = await commentModel.create({
        post: postId,
        user: isUserAuth._id,
        body,
        status: "queued",
      });

      await postModel.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: comments._id },
        }
      );
    }

    return Response.json({ message: "comment added" }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
