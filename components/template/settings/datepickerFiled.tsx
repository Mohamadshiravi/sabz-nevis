"use client";

export default function DatePickerField() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-2">
        <h3 className="vazir-medium">تاریخ تولد</h3>
        <h4 className="text-virgoolText-600 text-sm pl-2">
          تاریخ تولد در پروفایل نمایش داده نمی‌شود.
        </h4>
      </div>
      <input
        className="text-xs border border-zinc-200 px-4 py-2 rounded-md outline-none"
        type="text"
        placeholder="تاریخ تولد خود را وارد کنید"
      ></input>
    </div>
  );
}
