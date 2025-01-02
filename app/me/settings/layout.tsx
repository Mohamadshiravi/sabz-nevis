import DesktopNavbar from "@/components/module/dekstopNavbar";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import SettingsNavbar from "@/components/template/settings/settingsNavbar";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SettingLayout({
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
