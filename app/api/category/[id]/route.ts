import { categoryModel } from "@/models";
import IsUserAdmin from "@/utils/auth/isUserAdmin";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json({ message: "forbiden" }, { status: 403 });
  }

  try {
    await categoryModel.findOneAndDelete({ _id: params.id });

    return Response.json({ message: "category deleted" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
