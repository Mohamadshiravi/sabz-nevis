import { listModel } from "@/models";

export async function GET(req: Request) {
  try {
    const lists = await listModel
      .find({ status: "public" }, "-__v")
      .populate("user", "username avatar displayName")
      .populate("posts", "cover");

    return Response.json({
      message: "all lists",
      lists,
    });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
