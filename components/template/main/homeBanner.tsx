import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function HomeBanner() {
  return (
    <section className="sm:py-16 py-14 bg-emerald-800 text-white flex">
      <div className="flex sm:flex-row flex-col justify-center md:gap-60 sm:gap-40 gap-8 w-full sm:px-10 px-4">
        <div className="flex flex-col sm:gap-10 gap-4 sm:w-[600px] w-full">
          <div className="flex items-center gap-8">
            <Image
              src={"/images/sabz-logo.png"}
              alt="sabz-nevis-logo"
              width={800}
              height={800}
              className="w-[100px] sm:hidden block"
            />
            <div className="flex flex-col sm:gap-10 gap-4">
              <h2 className="sm:text-4xl text-2xl vazir-black">
                به <span className="text-emerald-600">سبز</span> نویس,
              </h2>
              <h2 className="sm:text-4xl text-2xl vazir-black">
                دنیای نوشته ها خوش آمدید.
              </h2>
            </div>
          </div>
          <p className="leading-loose sm:mt-0 mt-6 sm:text-base text-sm">
            سبز نویس بستری برای خواندن، گفت‌وگو درباره‌ی موضوعات مورد علاقه و به
            اشتراک‌گذاری ایده‌های اصیل و عمیق در زندگی شخصی، حرفه‌ای و اجتماعی
            است.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 justify-between">
          <Image
            src={"/images/sabz-logo.png"}
            alt="sabz-nevis-logo"
            width={800}
            height={800}
            className="w-[140px] sm:block hidden"
          />
          <Link
            href={"/register"}
            className="flex text-nowrap text-xs items-center gap-3 bg-my-green-600 hover:bg-my-green-700 transition rounded-full pr-5 pl-3 py-1.5 text-white vazir-bold"
          >
            شروع به نوشتن
            <IoIosArrowBack className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
