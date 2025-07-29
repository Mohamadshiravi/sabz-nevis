import ConnectToDB from "@/DB/connectToDB";
import { commentModel } from "@/models";
import IsUserAuthentication from "@/utils/auth/authUser";
import IsUserAdmin from "@/utils/auth/isUserAdmin";

export const revalidate = 0;

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    await ConnectToDB();

    const comment = await commentModel.findOne({ _id: params.id });
    const isUserliked = comment.likes.some(
      (e: string) => e.toString() === isUserAuth._id.toString()
    );

    if (isUserliked) {
      await commentModel.findOneAndUpdate(
        { _id: params.id },
        { $pull: { likes: isUserAuth._id } }
      );
    } else {
      await commentModel.findOneAndUpdate(
        { _id: params.id },
        { $push: { likes: isUserAuth._id } }
      );
    }

    return Response.json({ message: "comment toggled" });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json({ message: "forbiden" }, { status: 403 });
  }

  try {
    await ConnectToDB();

    await commentModel.findOneAndDelete({ _id: params.id });

    return Response.json({ message: "comment deleted" });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
