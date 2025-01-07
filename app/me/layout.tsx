import IsUserLogedIn from "@/utils/auth/authUserInComponnent";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await IsUserLogedIn();
  if (!user) {
    redirect("/login");
  }

  return children;
}
