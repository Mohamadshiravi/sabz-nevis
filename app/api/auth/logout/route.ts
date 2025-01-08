import { cookies } from "next/headers";

export async function GET() {
  try {
    cookies().delete("token");
    return Response.json({ message: "token deleted" });
  } catch (error) {
    return Response.json({ message: "error" }, { status: 500 });
  }
}
