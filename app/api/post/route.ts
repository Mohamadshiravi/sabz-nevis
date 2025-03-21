import ConnectToDB from "@/DB/connectToDB";
import { postModel } from "@/models/index";

export const revalidate = 0;

export async function GET(req: Request) {
  try {
    await ConnectToDB();

    const posts = await postModel
      .find({ status: "completed" }, "-__v -imagesID -status -body -imagesUrl")
      .populate("user", "displayName username avatar")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return Response.json({ message: "all post", posts });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
