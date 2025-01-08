import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;
  const token = cookies().get("token")?.value;
  if (token) {
    const isTokenValid = VerifyAccessToken(token);
    if (isTokenValid) {
      await ConnectToDB();
      user = await userModel.findOne(
        { phone: isTokenValid.phone },
        "phone -_id"
      );
    }
  }
  if (!user) {
    redirect("/login");
  }

  return children;
}
