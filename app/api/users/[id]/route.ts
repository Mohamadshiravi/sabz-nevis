import ConnectToDB from "@/DB/connectToDB";
import { listModel, postModel, userModel } from "@/models";
import IsUserAdmin from "@/utils/auth/isUserAdmin";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ConnectToDB();

    const user = await userModel.findOne(
      { username: params.id },
      "phone displayName"
    );

    return Response.json({ user });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json({ message: "forbiden" }, { status: 403 });
  }

  try {
    await userModel.findOneAndDelete({ _id: params.id });
    await userModel.updateMany(
      { following: params.id },
      { $pull: { following: params.id } }
    );
    await userModel.updateMany(
      { followers: params.id },
      { $pull: { followers: params.id } }
    );
    await postModel.updateMany(
      { likes: params.id },
      { $pull: { likes: params.id } }
    );
    await postModel.deleteMany({ user: params.id });
    await listModel.deleteMany({ user: params.id });
    return Response.json({ message: "user deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
