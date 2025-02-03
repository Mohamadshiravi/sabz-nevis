import ConnectToDB from "@/DB/connectToDB";
import { commentModel } from "@/models";
import IsUserAuthentication from "@/utils/auth/authUser";

export const revalidate = 0;

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
