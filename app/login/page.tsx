import LoginForm from "@/components/template/login/loginForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری - ویرگول",
  description: "این وبسایت صرفا یک کپی از وبسایت ویرگول برای نمونه کار است",
};

export default function LoginSection() {
  return (
    <main className="flex lg:flex-row flex-col items-center w-full h-screen text-virgoolText-800">
      <section className="relative w-full lg:h-full h-[300px] flex items-center justify-center bg-gradient-to-tl from-[#00b09b] to-[#96c93d]">
        <Link
          href={"/home"}
          className="absolute top-4 right-4  text-emerald-700 text-sm"
        >
          صفحه اصلی
        </Link>
        <div className="flex flex-col items-center px-4">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <Image
              src={"/images/sabz-logo.png"}
              width={600}
              height={600}
              alt="virgool logo"
              className="sm:w-[70px] w-[50px]"
            />
          </div>
          <h2 className="lg:mt-20 mt-6 vazir-bold lg:text-3xl text-xl text-white">
            اینجا هر کسی می‌تونه بنویسه!
          </h2>
          <h4 className="mt-3 lg:block hidden vazir-bold text-center lg:text-base text-sm">
            همین حالا حساب کاربری خودت را بساز و دوران جدید وبلاگ نویسی را شروع
            کن.
          </h4>
        </div>
      </section>
      <LoginForm />
    </main>
  );
}
