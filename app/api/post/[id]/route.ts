import ConnectToDB from "@/DB/connectToDB";
import { commentModel, listModel, postModel } from "@/models/index";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter");

  try {
    await ConnectToDB();

    if (filter === "simple") {
      const post = await postModel.findOne(
        { _id: params.id },
        "likes comments"
      );
      if (post) {
        return Response.json({ post });
      } else {
        return Response.json({ message: "not found" }, { status: 404 });
      }
    } else {
      const isUserAuth = await IsUserAuthentication();

      const post = await postModel.findOne(
        { _id: params.id },
        "-__v -imagesID -updatedAt -body"
      );

      if (!post) {
        return Response.json({ message: "not found" }, { status: 404 });
      }

      if (post.user.toString() !== isUserAuth._id.toString()) {
        //other users dont have access to post body

        return Response.json({ post });
      } else {
        const post = await postModel.findOne(
          { _id: params.id },
          "-__v -imagesID -updatedAt"
        );

        return Response.json({ post });
      }
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  const post = await postModel.findOne({ _id: params.id }, "_id user");

  if (!post) {
    return Response.json({ message: "not found" }, { status: 404 });
  }

  if (post.user.toString() !== isUserAuth._id.toString()) {
    //other users dont have access to delete post
    return Response.json({ message: "dont access" }, { status: 403 });
  }

  try {
    await postModel.findOneAndDelete({ _id: params.id });
    await listModel.updateMany(
      { posts: params.id },
      { $pull: { posts: params.id } }
    );
    await commentModel.deleteMany({ post: params.id });

    return Response.json({ message: "post deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
