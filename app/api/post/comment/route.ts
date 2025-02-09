import { postModel, commentModel } from "@/models/index";
import IsUserAuthentication from "@/utils/auth/authUser";

export const revalidate = 0;

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const status = searchParams.get("status");

    switch (status) {
      case "queued": {
        if (start && end) {
          const limit = +end - +start + 1;
          const posts = await commentModel
            .find({ status: "queued" })
            .skip(+start)
            .limit(limit)
            .populate({
              path: "user",
              select: "username displayName avatar",
            })
            .populate({
              path: "replyTo",
              select: "-__v -post -updatedAt -replies",
              populate: {
                path: "user",
                select: "username displayName avatar",
              },
            })
            .sort({ createdAt: -1 })
            .exec();
          return Response.json(posts);
        } else {
          const posts = await commentModel
            .find({ status: "queued" })
            .populate({
              path: "user",
              select: "username displayName avatar",
            })
            .populate({
              path: "replyTo",
              select: "-__v -post -updatedAt -replies",
              populate: {
                path: "user",
                select: "username displayName avatar",
              },
            })
            .sort({ createdAt: -1 });

          return Response.json(posts);
        }
      }
      case "accepted": {
        if (start && end) {
          const limit = +end - +start + 1;
          const posts = await commentModel
            .find({ status: "accepted" })
            .skip(+start)
            .limit(limit)
            .populate({
              path: "user",
              select: "username displayName avatar",
            })
            .populate({
              path: "replyTo",
              select: "-__v -post -updatedAt -replies",
              populate: {
                path: "user",
                select: "username displayName avatar",
              },
            })
            .sort({ createdAt: -1 })
            .exec();
          return Response.json(posts);
        } else {
          const posts = await commentModel
            .find({ status: "accepted" })
            .populate({
              path: "user",
              select: "username displayName avatar",
            })
            .populate({
              path: "replyTo",
              select: "-__v -post -updatedAt -replies",
              populate: {
                path: "user",
                select: "username displayName avatar",
              },
            })
            .sort({ createdAt: -1 });

          return Response.json(posts);
        }
      }
      default: {
        const posts = await commentModel
          .find()
          .populate({
            path: "user",
            select: "username displayName avatar",
          })
          .populate({
            path: "replyTo",
            select: "-__v -post -updatedAt -replies",
            populate: {
              path: "user",
              select: "username displayName avatar",
            },
          })
          .sort({ createdAt: -1 });

        return Response.json(posts);
      }
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
