import ConnectToDB from "@/DB/connectToDB";
import { listModel } from "@/models/index";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    await ConnectToDB();

    const { postId } = await req.json();

    const checkingList = await listModel.findOne({ _id: params.id });

    if (
      checkingList.posts.some((p: any) => p.toString() === postId.toString())
    ) {
      const updatedList = await listModel.findOneAndUpdate(
        { _id: params.id },
        {
          $pull: { posts: postId },
        }
      );

      const list = await listModel
        .findById(updatedList._id, "-__v")
        .populate("user", "username")
        .populate("posts", "cover");

      return Response.json({ message: "post added", list });
    } else {
      const updatedList = await listModel.findOneAndUpdate(
        { _id: params.id },
        {
          $push: { posts: postId },
        }
      );

      const list = await listModel
        .findById(updatedList._id, "-__v")
        .populate("user", "username")
        .populate("posts", "cover");

      return Response.json({ message: "post added", list });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const list = await listModel
      .findById(params.id, "-__v")
      .populate("user", "username")
      .populate({
        path: "posts",
        select: "-body -imagesUrl -imagesID -updatedAt -status",
        populate: {
          path: "user",
          select: "username displayName avatar",
        },
      });

    return Response.json({
      message: "user list",
      list,
    });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
