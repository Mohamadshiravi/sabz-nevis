import { postModel } from "@/models/index";
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
    const postId = formdata.get("postId");

    const currentPost = await postModel
      .findOne({ _id: postId }, "-_id user")
      .populate("user", "phone");

    if (currentPost.user.phone !== isUserAuth.phone) {
      return Response.json(
        { message: "you dont have Access" },
        { status: 403 }
      );
    }

    if (!img && !postId) {
      return Response.json({ error: "data is incorect" }, { status: 400 });
    }

    const bufferedPhoto = Buffer.from(await img.arrayBuffer());

    const response = await imagekit.upload({
      file: bufferedPhoto,
      fileName: `img-${Date.now()}`,
      folder: "/uploads/posts",
    });

    await postModel.findOneAndUpdate(
      { _id: postId },
      {
        $push: { imagesID: response.fileId, imagesUrl: response.url },
      }
    );

    return Response.json({ message: "image uploaded", path: response.url });
  } catch (error) {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
