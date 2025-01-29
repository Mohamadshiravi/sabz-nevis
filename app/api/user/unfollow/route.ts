import ConnectToDB from "@/DB/connectToDB";
import { userModel } from "@/models";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function POST(req: Request) {
  try {
    const isUserAuth = await IsUserAuthentication();
    if (!isUserAuth) {
      return Response.json({ message: "user unAuth" }, { status: 401 });
    }

    const { id } = await req.json();

    ConnectToDB();
    const followedUser = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: { followers: isUserAuth._id },
      }
    );

    const user = await userModel.findOneAndUpdate(
      { _id: isUserAuth._id },
      {
        $pull: { following: followedUser._id },
      },
      { new: true }
    );

    return Response.json({ message: "user unfollowed", user }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
