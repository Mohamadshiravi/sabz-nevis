import DesktopNavbar from "@/components/module/dekstopNavbar";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import ListsMainSection from "@/components/template/me/listsMainSection";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/TokenControl";
import { cookies } from "next/headers";

export default async function ListsPage() {
  let userData = null;
  const token = cookies().get("token")?.value;
  if (token) {
    const isTokenValid = VerifyAccessToken(token);
    if (isTokenValid) {
      await ConnectToDB();
      userData = await userModel.findOne({ phone: isTokenValid.phone }, "-__v");
    }
  }
  return (
    <>
      <Header />
      <main
        className={`${
          userData
            ? "lg:px-0 px-4 grid lg:grid-cols-[2fr_7fr_3fr] grid-cols-[1fr] gap-10"
            : "md:px-20 px-4 grid lg:grid-cols-[8fr_4fr] grid-cols-[1fr] lg:gap-32 gap-10"
        }`}
      >
        <DesktopNavbar />
        <ListsMainSection />
        <Footer isSimple />
      </main>
      <MobileNavbar />
    </>
  );
}
