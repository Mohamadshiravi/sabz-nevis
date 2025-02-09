import DesktopNavbar from "@/components/module/dekstopNavbar";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import SettingsNavbar from "@/components/template/settings/settingsNavbar";

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main
        className={`lg:px-0 px-4 grid lg:grid-cols-[2fr_7fr_3fr] grid-cols-[1fr] gap-6`}
      >
        <DesktopNavbar />
        <section className="w-full overflow-hidden">
          <h1 className="mt-20 vazir-bold text-4xl">تنظیمات</h1>
          <SettingsNavbar />
          {children}
        </section>
        <Footer isSimple />
      </main>
      <MobileNavbar />
    </>
  );
}
