import Link from "next/link";

export default function ListsMainSection() {
  return (
    <section className="py-14">
      <div className="flex items-center justify-between w-full mt-8">
        <h1 className="vazir-bold sm:text-3xl text-2xl">لیست‌های شما</h1>

        <button className="flex items-center bg-virgoolBlue hover:bg-virgoolBlueHover transition text-white px-5 py-1.5 text-sm rounded-full gap-2 vazir-bold">
          ساخت لیست جدید
        </button>
      </div>
    </section>
  );
}
