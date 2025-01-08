import IsUserAuthentication from "@/utils/auth/authUser";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await IsUserAuthentication();
  if (!user) {
    redirect("/login");
  }

  return children;
}
