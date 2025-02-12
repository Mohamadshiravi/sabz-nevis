import AdminPanelHeader from "@/components/template/p-admin/adminPanelHeader";
import AdminPanelNavbar from "@/components/template/p-admin/adminPanelNavbar";
import IsUserAdmin from "@/utils/auth/isUserAdmin";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "خوشامدید ادمین",
  description: "سبز نویس یک وبسایت برای نوشتن وبلاگ های خودتون",
};

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserAdmin = await IsUserAdmin();
  if (!isUserAdmin) {
    redirect("/login");
  }

  return (
    <>
      <AdminPanelHeader />
      <main className={`grid lg:grid-cols-[2fr_10fr] grid-cols-[1fr]`}>
        <div className="lg:block hidden">
          <AdminPanelNavbar />
        </div>
        <section className="w-full overflow-hidden p-4">{children}</section>
      </main>
    </>
  );
}
