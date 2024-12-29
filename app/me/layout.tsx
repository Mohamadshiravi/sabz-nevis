import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/TokenControl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token")?.value;
  if (!token) {
    redirect("/login");
  }
  const isTokenValid = VerifyAccessToken(token);
  if (!isTokenValid) {
    redirect("/login");
  }

  await ConnectToDB();
  const isUser = await userModel.findOne({ phone: isTokenValid.phone });
  if (!isUser) {
    redirect("/login");
  }

  return children;
}
