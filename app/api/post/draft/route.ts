import postModel from "@/models/post";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { title, body, postID } = await req.json();

    if (!postID) {
      const newPost = await postModel.create({
        title,
        body,
        status: "draft",
        user: isUserAuth._id,
      });
      return Response.json(
        { message: "post created", id: newPost._id },
        { status: 201 }
      );
    } else {
      const currentPost = await postModel
        .findOne({ _id: postID }, "-_id user")
        .populate("user", "phone");

      if (currentPost.user.phone !== isUserAuth.phone) {
        return Response.json(
          { message: "you dont have Access" },
          { status: 403 }
        );
      }

      await postModel.findOneAndUpdate(
        { _id: postID },
        {
          title,
          body,
        }
      );
      const post = await postModel.findOne({ _id: postID }, "_id imagesUrl");
      return Response.json({
        message: "post updated",
        id: post._id,
        images: post.imagesUrl,
      });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
