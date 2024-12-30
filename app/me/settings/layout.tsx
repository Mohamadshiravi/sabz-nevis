import DesktopNavbar from "@/components/module/dekstopNavbar";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
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
        <section className="w-full">
          <h1 className="mt-20 vazir-bold text-4xl">تنظیمات</h1>
          <div className="no-scrollbar sm:w-full w-[350px] overflow-x-scroll overflow-y-hidden flex items-center gap-3 border-b border-zinc-200 mt-14">
            <div className="pb-2 px-2 text-nowrap relative text-virgoolText-800 vazir-bold after:content-[''] after:absolute after:w-full after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-virgoolText-800">
              درباره شما
            </div>
            <div className="pb-2 text-nowrap vazir-medium px-2 text-virgoolText-600">
              حساب کاربری
            </div>
            <div className="pb-2 text-nowrap vazir-medium px-2 text-virgoolText-600">
              اطلاعیه ها
            </div>
            <div className="pb-2 text-nowrap vazir-medium px-2 text-virgoolText-600">
              تنظیمات پیشرفته
            </div>
          </div>
          {children}
        </section>
        <Footer isSimple />
      </main>
      <MobileNavbar />
    </>
  );
}
