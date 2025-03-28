import ConnectToDB from "@/DB/connectToDB";
import { commentModel, listModel, postModel, userModel } from "@/models";
import { PostModelType } from "@/models/post";
import IsUserAdmin from "@/utils/auth/isUserAdmin";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.CLOUD_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

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
    const user = await userModel.findById(
      { _id: params.id },
      "phone fileID _id"
    );
    if (user.fileID) {
      await imagekit.deleteFile(user.fileID);
    }
    await userModel.findOneAndDelete({ _id: user._id });
    await userModel.updateMany(
      { following: user._id },
      { $pull: { following: user._id } }
    );
    await userModel.updateMany(
      { followers: user._id },
      { $pull: { followers: user._id } }
    );
    await postModel.updateMany(
      { likes: user._id },
      { $pull: { likes: user._id } }
    );
    const userPosts = await postModel.find({ user: user._id }, "imagesID");
    userPosts.map((post) => {
      post.imagesID.map(async (fileId: string) => {
        await imagekit.deleteFile(fileId);
      });
    });
    await postModel.deleteMany({ user: user._id });
    await listModel.deleteMany({ user: user._id });
    await commentModel.deleteMany({ user: user._id });
    return Response.json({ message: "user deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
