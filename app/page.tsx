import DesktopNavbar from "@/components/module/dekstopNavbar";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import HomeBanner from "@/components/template/homeBanner";
import MainSection from "@/components/template/main/main";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import IsUserLogedIn from "@/utils/auth/authUserInComponnent";
import { VerifyAccessToken } from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";

export default async function Home() {
  let userData = null;

  const token = cookies().get("token")?.value;
  if (token) {
    const isTokenValid = VerifyAccessToken(token);
    if (isTokenValid) {
      await ConnectToDB();
      const isUserExist = await userModel.findOne(
        {
          phone: isTokenValid.phone,
        },
        "-_id phone"
      );
      if (isUserExist) {
        userData = isUserExist;
      }
    }
  }

  return (
    <>
      <Header />
      {!userData && <HomeBanner />}
      <main
        className={`${
          userData
            ? "lg:px-0 px-4 grid lg:grid-cols-[2fr_7fr_3fr] grid-cols-[1fr] gap-10"
            : "md:px-20 px-4 grid lg:grid-cols-[8fr_4fr] grid-cols-[1fr] lg:gap-32 gap-10"
        }`}
      >
        {userData && <DesktopNavbar />}
        <MainSection isUserLogedIn={userData} />
        <Footer />
      </main>
      <MobileNavbar />
    </>
  );
}
