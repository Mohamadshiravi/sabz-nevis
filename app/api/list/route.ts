import ConnectToDB from "@/DB/connectToDB";
import { listModel } from "@/models";
import IsUserAuthentication from "@/utils/auth/authUser";

export const revalidate = 0;

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { name, status } = await req.json();

    const list = await listModel.create({ name, status, user: isUserAuth._id });

    return Response.json(
      {
        message: "list created",
        list,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const lists = await listModel
      .find({ user: isUserAuth._id }, "-__v")
      .populate("user", "username");

    return Response.json({
      message: "list created",
      lists,
    });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
