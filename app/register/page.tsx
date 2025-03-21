import RegisterForm from "@/components/template/register/registerForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ایجاد حساب کاربری - سبز نویس",
};

export default function RegisterSection() {
  return (
    <main className="flex lg:flex-row flex-col items-center w-full h-screen text-myText-800 bg-white">
      <section className="w-full transition relative lg:h-full h-[300px] flex items-center justify-center bg-gradient-to-tl from-[#00b09b] to-[#96c93d]">
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
              alt="sabz-nevis logo"
              className="sm:w-[70px] w-[50px]"
            />
          </div>
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
