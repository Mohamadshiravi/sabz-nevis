"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeadphones } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdWarningAmber } from "react-icons/md";

export default function MainSection() {
  const [podcasts, setPodcasts] = useState([
    {
      name: "پادکست رفتار",
      src: "/podcasts/9914925a-3298-4ab3-a70a-251f481ddf1a.webp",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
    },
    {
      name: "اینده نزدیک",
      src: "/podcasts/7rlj3f.webp",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
    },
    {
      name: "سطر نشین",
      src: "/podcasts/34d7d782-8d73-4009-a5ec-738b657f236e.webp",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
    },
    {
      name: "راز های کسب و کار",
      src: "/podcasts/business.webp",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
    },
    {
      name: "ارامش ذهن",
      src: "/podcasts/psychology.webp",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
    },

    {
      name: "شاهنامه خوانی",
      src: "/podcasts/shahnameh.webp",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
    },
  ]);

  function LoadMore() {
    setPodcasts([...podcasts, ...podcasts]);
  }

  return (
    <section className="w-full py-14">
      <div className="w-full flex items-center gap-4 bg-zinc-200 text-red-800 bg-red-100 px-3 py-1.5 rounded-md vazir-medium">
        <MdWarningAmber className="text-2xl" />
        <h3 className="sm:text-lg text-base">
          قابلیت پادکست پیاده سازی نشده است
        </h3>
      </div>
      <div className="flex items-center justify-between w-full mt-8">
        <div className="flex items-center gap-4">
          <span className="bg-zinc-100 p-3 rounded-full text-xl">
            <FaHeadphones />
          </span>
          <h1 className="vazir-bold sm:text-3xl text-2xl">پادکست‌ها</h1>
        </div>
        <Link
          href={"/"}
          className="flex items-center bg-zinc-200 text-virgoolText-600 px-5 py-1.5 rounded-full gap-2 text-sm vazir-medium"
        >
          بازگشت
          <IoIosArrowBack />
        </Link>
      </div>
      <h3 className="mt-10 text-virgoolText-500 vazir-medium w-full text-left">
        تعداد : 30
      </h3>
      <div className="grid md:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-8 mt-6 pt-4 border-t border-zinc-200">
        {podcasts.map((e, i) => (
          <div key={i} className="flex items-center gap-2">
            <Image
              src={e.src}
              width={800}
              height={800}
              alt={e.name}
              className="sm:w-[100px] w-[85px] rounded-md"
            />
            <div className="flex flex-col gap-2">
              <h3 className="vazir-bold sm:text-base text-sm">{e.name}</h3>
              <p className="text-virgoolText-500 sm:text-sm text-xs">
                {e.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-20 mb-8">
        <button
          onClick={LoadMore}
          className="m-auto text-sm vazir-medium hover:bg-zinc-800 hover:text-white transition px-4 py-1 border-2 border-zinc-800 rounded-full"
        >
          بارگذاری موارد بیشتر
        </button>
      </div>
    </section>
  );
}
