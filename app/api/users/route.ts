import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function GET(req: Request) {
  const isUserAuth = await IsUserAuthentication();

  try {
    await ConnectToDB();

    if (isUserAuth) {
      const filteredUsers = await userModel.find(
        { _id: { $ne: isUserAuth._id } },
        "avatar username displayName followers"
      );

      return Response.json({ users: filteredUsers });
    } else {
      const allUsers = await userModel.find(
        {},
        "avatar username displayName followers"
      );

      return Response.json({ users: allUsers });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
