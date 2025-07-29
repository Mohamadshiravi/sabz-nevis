import { userModel } from "@/models";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const userFollowers = await userModel
      .findById(params.id, "following")
      .populate("following", "username displayName avatar");

    return Response.json({
      message: "user following",
      data: userFollowers.following,
    });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
