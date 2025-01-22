import userModel from "@/models/user";
import IsUserAuthentication from "@/utils/auth/authUser";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.CLOUD_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const formdata = await req.formData();
    const img = formdata.get("img") as Blob;

    if (!img) {
      return Response.json({ error: "no file send" }, { status: 400 });
    }

    const oldUserData = await userModel.findOne({ _id: isUserAuth._id });
    if (oldUserData.avatar) {
      await imagekit.deleteFile(oldUserData.fileID);
    }

    const bufferedPhoto = Buffer.from(await img.arrayBuffer());

    const response = await imagekit.upload({
      file: bufferedPhoto,
      fileName: `avatar-${Date.now()}`,
      folder: "/uploads/avatar",
    });

    await userModel.findOneAndUpdate(
      { _id: isUserAuth._id },
      { avatar: response.url, fileID: response.fileId }
    );

    const user = await userModel.findOne({ _id: isUserAuth._id });

    return Response.json({ message: "user avatar updated", user });
  } catch (error) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
