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
    <main className="flex lg:flex-row flex-col items-center w-full h-screen">
      <section className="relative w-full lg:h-full h-[300px] flex items-center justify-center bg-gradient-to-br from-[#054592] to-[#1897d4]">
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
          <h2 className="lg:mt-20 mt-6 vazir-bold lg:text-3xl text-xl text-white">
            اینجا هر کسی می‌تونه بنویسه!
          </h2>
          <h4 className="mt-3 lg:block hidden vazir-bold text-center lg:text-base text-sm">
            همین حالا حساب کاربری خودت را بساز و دوران جدید وبلاگ نویسی را شروع
            کن.
          </h4>
        </div>
      </section>
      <section className="lg:w-[750px] w-full bg-white h-full relative">
        <form className="flex flex-col lg:justify-center w-full h-full gap-3 px-8">
          <h1 className="vazir-black text-xl text-virgoolBlue lg:mt-0 mt-8">
            ورود به حساب کاربری
          </h1>
          <h3 className="text-virgoolText-600">
            شماره موبایل یا نام کاربری خود را وارد کنید
          </h3>
          <div className="flex flex-col items-end gap-4">
            <input
              type="text"
              className="InpShadow w-full outline-none border px-4 border-zinc-200 py-3 rounded-full shadow-md"
              placeholder="شماره موبایل , نام کاربری"
            />
            <button className="flex text-nowrap lg:w-auto w-full text-sm items-center justify-center gap-4 bg-virgoolBlue hover:bg-virgoolBlueHover transition rounded-full pr-5 pl-3 py-2 text-white">
              ورود به حساب کاربری
              <IoIosArrowBack className="text-lg" />
            </button>
            <Link
              href={"/register"}
              className="w-full text-center text-sm mt-10"
            >
              عضو نیستید؟ ثبت نام کنید
            </Link>
          </div>
        </form>
        <Link
          href={"/register"}
          className="absolute bottom-10 lg:block hidden w-full text-center text-sm"
        >
          عضو نیستید؟ ثبت نام کنید
        </Link>
      </section>
    </main>
  );
}
