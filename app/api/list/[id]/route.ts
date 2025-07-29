import ConnectToDB from "@/DB/connectToDB";
import { listModel } from "@/models/index";
import IsUserAuthentication from "@/utils/auth/authUser";
import IsUserAdmin from "@/utils/auth/isUserAdmin";

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await ConnectToDB();
    const list = await listModel
      .findById(params.id, "-__v")
      .populate("user", "username")
      .populate({
        path: "posts",
        select: "-body -imagesUrl -imagesID -updatedAt -status",
        populate: [
          {
            path: "user",
            select: "username displayName avatar",
          },
          {
            path: "category",
            select: "name",
          },
        ],
      });

    return Response.json({
      message: "user list",
      list,
    });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    await ConnectToDB();

    const list = await listModel.findOne({ _id: params.id }, "_id user name");

    if (!list) {
      return Response.json({ message: "not found" }, { status: 404 });
    }

    if (list.user.toString() !== isUserAuth._id.toString()) {
      const isUserAdmin = await IsUserAdmin();
      if (!isUserAdmin) {
        return Response.json({ message: "dont access" }, { status: 403 });
      }
      //other users dont have access to delete list // only admin can delete other user lists
    }

    if (list.name === "پست های ذخیره شده") {
      return Response.json({ message: "cant delete this" }, { status: 400 });
    }

    await listModel.findOneAndDelete({ _id: params.id });

    return Response.json({
      message: "user list",
      id: list._id,
    });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
