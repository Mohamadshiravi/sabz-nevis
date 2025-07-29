import ConnectToDB from "@/DB/connectToDB";
import { commentModel, listModel, postModel } from "@/models";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/auth/tokenControl";
import ImageKit from "imagekit";
import { cookies } from "next/headers";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.CLOUD_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function DELETE() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return Response.json({ message: "error" }, { status: 401 });
    }

    const isTokenValid = VerifyAccessToken(token);
    if (!isTokenValid) {
      return Response.json({ message: "error" }, { status: 401 });
    }

    await ConnectToDB();
    const user = await userModel.findOne(
      { phone: isTokenValid.phone },
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
    return Response.json({ message: "user deleted" });
  } catch (error) {
    return Response.json({ message: "error" }, { status: 500 });
  }
}
