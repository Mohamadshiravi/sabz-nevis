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

    if (name === "پست های ذخیره شده") {
      return Response.json({ message: "cant create this" }, { status: 400 });
    }

    const createdList = await listModel.create({
      name,
      status,
      user: isUserAuth._id,
    });
    const list = await listModel
      .findById(createdList._id, "-__v")
      .populate("user", "username");

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
      .populate("user", "username")
      .populate("posts", "cover");

    return Response.json({
      message: "user lists",
      lists,
    });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
