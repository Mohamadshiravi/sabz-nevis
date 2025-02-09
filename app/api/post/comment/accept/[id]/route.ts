import ConnectToDB from "@/DB/connectToDB";
import { commentModel } from "@/models";
import IsUserAdmin from "@/utils/auth/isUserAdmin";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json({ message: "forbiden" }, { status: 403 });
  }

  try {
    await ConnectToDB();

    await commentModel.findOneAndUpdate(
      { _id: params.id },
      {
        status: "accepted",
      }
    );

    return Response.json({ message: "comment accepeted" });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
