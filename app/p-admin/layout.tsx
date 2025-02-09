import DesktopNavbar from "@/components/module/dekstopNavbar";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import AdminPanelHeader from "@/components/template/p-admin/adminPanelHeader";
import AdminPanelNavbar from "@/components/template/p-admin/adminPanelNavbar";
import SettingsNavbar from "@/components/template/settings/settingsNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خوشامدید ادمین",
  description: "سبز نویس یک وبسایت برای نوشتن وبلاگ های خودتون",
};

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
