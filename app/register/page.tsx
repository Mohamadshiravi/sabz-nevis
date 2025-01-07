import RegisterForm from "@/components/template/register/registerForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ایجاد حساب کاربری - ویرگول",
  description: "این وبسایت صرفا یک کپی از وبسایت ویرگول برای نمونه کار است",
};

export default function RegisterSection() {
  return (
    <main className="flex lg:flex-row flex-col items-center w-full h-screen text-virgoolText-800">
      <section className="w-full transition relative lg:h-full h-[300px] flex items-center justify-center bg-gradient-to-br from-[#054592] to-[#1897d4]">
        <Link
          href={"/"}
          className="absolute top-4 right-4  text-[#94deff] text-sm"
        >
          صفحه اصلی
        </Link>
        <div className="flex flex-col items-center px-4">
          <Image
            src={"/images/logo-bg.svg"}
            width={600}
            height={600}
            alt="virgool logo"
            className="w-[100px]"
          />
          <h2 className="lg:mt-20 mt-6 vazir-bold lg:text-3xl text-xl text-white text-center w-full">
            اینجا هر کسی می‌تونه بنویسه!
          </h2>
          <h4 className="mt-3 lg:block hidden vazir-bold text-center lg:text-base text-sm">
            همین حالا حساب کاربری خودت را بساز و دوران جدید وبلاگ نویسی را شروع
            کن.
          </h4>
        </div>
      </section>
      <RegisterForm />
    </main>
  );
}
