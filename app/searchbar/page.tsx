"use client";

import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import { fetchCategoriesFromServer } from "@/redux/slices/category";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

export default function SearchBarPage() {
  const [searchInp, setSearchInp] = useState("");

  const router = useRouter();

  const { data: categories, loading } = useTypedSelector(
    (state) => state.categories
  );
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategoriesFromServer());
    }
  }, []);
  return (
    <>
      <Header />
      <main className="lg:w-[1024px] w-full m-auto px-4 lg:py-10 pt-10 pb-20">
        <form
          onSubmit={SearchHandler}
          className="lg:mt-20 mt-6 rounded-full border lg:w-[800px] w-full lg:h-[80px] h-[60px] m-auto border-zinc-200 dark:border-zinc-700 bg-zinc-100 relative dark:bg-dark-color-700 text-sm items-center sm:gap-4 gap-3 sm:pr-6 pr-4 flex"
        >
          <IoSearch className="sm:text-4xl text-3xl" />
          <input
            id="search-inp"
            type="text"
            placeholder="جست و جو در سبز نویس"
            value={searchInp}
            onChange={(e) => setSearchInp(e.target.value)}
            className="bg-inherit lg:text-xl text-base w-full h-full outline-hidden py-1.5 rounded-l-full"
          />
          {searchInp !== "" && (
            <button className="bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-white dark:hover:bg-zinc-200 rounded-full absolute lg:left-2 left-1 border dark:text-zinc-800 lg:w-[60px] w-[50px] lg:h-[60px] h-[50px] text-3xl flex items-center justify-center">
              <IoIosArrowBack />
            </button>
          )}
        </form>
        <h3 className="mt-20 vazir-bold md:text-3xl text-2xl text-center">
          موضوعات
        </h3>
        <section className="mt-6 py-6 sm:px-6 px-0 flex flex-wrap gap-4 border-t border-zinc-300 dark:border-zinc-700">
          {loading
            ? Array.from({ length: 30 }).map((e, i) => (
                <div
                  key={i}
                  className="bg-zinc-200 rounded-md dark:bg-zinc-800 animate-pulse w-[110px] grow h-[45px]"
                ></div>
              ))
            : categories?.map((e) => (
                <Link
                  key={e._id}
                  href={`/category/${e._id}`}
                  className="sm:text-lg text-base shadow-lg border-dashed px-6 grow py-2 vazir-medium rounded-md transition cursor-pointer text-center text-my-text-800 dark:text-my-text-500 border border-my-text-800 dark:border-my-text-500"
                >
                  {e.name}
                </Link>
              ))}
        </section>
      </main>
      <MobileNavbar />
    </>
  );
  function SearchHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchInp !== "") {
      router.push(`/search/posts?q=${searchInp}`);
    }
  }
}
