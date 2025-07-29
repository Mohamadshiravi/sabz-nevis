"use client";

import { useSearchParams } from "next/navigation";

export default function SearchDetails() {
  const searchedWord = useSearchParams().get("q");
  return (
    <h2 className="mt-20 vazir-medium sm:text-2xl text-xl">
      <span className="text-my-text-500">نتایج جستجو برای </span> /{" "}
      {searchedWord}
    </h2>
  );
}
