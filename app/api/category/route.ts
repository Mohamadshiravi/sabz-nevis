import ConnectToDB from "@/DB/connectToDB";
import { categoryModel } from "@/models";
import IsUserAdmin from "@/utils/auth/isUserAdmin";

export async function POST(req: Request) {
  await ConnectToDB();

  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json({ message: "forbiden" }, { status: 403 });
  }
  try {
    const { name } = await req.json();

    const category = await categoryModel.create({
      name,
    });

    return Response.json(
      {
        message: "category created",
        category,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
export async function GET(req: Request) {
  await ConnectToDB();
  try {
    const categories = await categoryModel.find({}, "-__v");

    return Response.json({
      message: "all categories",
      categories,
    });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
