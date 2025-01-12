import DesktopNavbar from "@/components/module/dekstopNavbar";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import HomeBanner from "@/components/template/homeBanner";
import IsUserAuthentication from "@/utils/auth/authUser";
import { ReactNode } from "react";

export default async function PodcastLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userData = await IsUserAuthentication();
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
        {children}
        <Footer />
      </main>
      <MobileNavbar />
    </>
  );
}
