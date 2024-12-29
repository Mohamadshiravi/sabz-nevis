import DesktopNavbar from "@/components/module/dekstopNavbar";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import MainSection from "@/components/template/podcasts/mainSection";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/TokenControl";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function PodcastsSection() {
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
        {userData && <DesktopNavbar />}
        <MainSection />
        <section
          className={`w-full sm:pt-14 py-4 lg:flex hidden flex-col gap-4 ${
            userData ? "lg:px-6" : "lg:px-8 px-0"
          } lg:border-r border-zinc-200`}
        >
          <Image
            src={"/images/virgool_business_cta.webp"}
            width={800}
            height={800}
            alt="busines banner"
            className="rounded-lg"
          />

          <div className="border border-zinc-200 rounded-md grid grid-cols-[6fr_6fr] py-4">
            <div className="flex items-center justify-center">
              <Image
                src={"/images/logo.png"}
                width={600}
                height={600}
                alt="samandehi"
                className="w-[80px]"
              />
            </div>
            <div className="flex items-center justify-center border-r border-zinc-200">
              <Image
                src={"/images/logo2.png"}
                width={600}
                height={600}
                alt="enamad"
                className="w-[80px]"
              />
            </div>
          </div>
        </section>
      </main>
      <MobileNavbar />
    </>
  );
}
