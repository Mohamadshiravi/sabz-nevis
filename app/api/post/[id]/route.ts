import ConnectToDB from "@/DB/connectToDB";
import { postModel } from "@/models/index";
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
      const post = await postModel.findOne(
        { _id: params.id },
        "-__v -imagesID -updatedAt"
      );
      if (post) {
        return Response.json({ post });
      } else {
        return Response.json({ message: "not found" }, { status: 404 });
      }
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
