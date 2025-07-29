import { userModel } from "@/models";
import IsUserAdmin from "@/utils/auth/isUserAdmin";

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    return Response.json({ message: "forbiden" }, { status: 403 });
  }

  try {
    const user = await userModel.findById(params.id, "role");

    await userModel.findOneAndUpdate(
      { _id: params.id },
      {
        role: user.role === "user" ? "admin" : "user",
      }
    );
    return Response.json({
      message: "user role changed",
    });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
