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

    const isUserFollowed = await userModel.findOne({ _id: id });
    if (isUserFollowed.followers.includes(isUserAuth._id)) {
      return Response.json(
        { message: "user followed before" },
        { status: 400 }
      );
    }

    ConnectToDB();
    const followedUser = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { followers: isUserAuth._id },
      }
    );

    const user = await userModel.findOneAndUpdate(
      { _id: isUserAuth._id },
      {
        $push: { following: followedUser._id },
      },
      { new: true }
    );

    return Response.json({ message: "user followed", user }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
