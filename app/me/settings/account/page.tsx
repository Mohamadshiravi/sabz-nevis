import { FaEdit } from "react-icons/fa";

export default function SettingsAccount() {
  return (
    <div className="flex flex-col gap-10 pt-10 lg:pb-10 pb-20">
      <div className="flex items-center justify-between w-full">
        <h3 className="vazir-medium">نام کاربری</h3>
        <FaEdit className="text-xl" />
      </div>
      <div className="flex items-center justify-between w-full">
        <h3 className="vazir-medium">ایمیل</h3>
        <FaEdit className="text-xl" />
      </div>
      <div className="flex items-center justify-between w-full">
        <h3 className="vazir-medium">شماره موبایل</h3>
        <FaEdit className="text-xl" />
      </div>

      <hr />

      <div className="flex items-center justify-between w-full">
        <h3 className="vazir-medium">تغییر رمز عبور</h3>
        <FaEdit className="text-xl" />
      </div>
      <div className="flex items-center justify-between w-full">
        <h3 className="vazir-medium">فراموشی رمز عبور</h3>
        <FaEdit className="text-xl" />
      </div>

      <hr />

      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-medium">مدیریت کاربران بلاک شده</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            مشاهده لیست افرادی که بلاک کرده‌اید
          </h4>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-2 items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h3 className="vazir-medium">حذف حساب کاربری</h3>
          <h4 className="text-virgoolText-600 text-sm pl-2">
            با حذف حساب کاربری، تمام اطلاعات شما از سرورهای ما حذف می‌شود
          </h4>
        </div>
        <button className="text-sm vazir-medium hover:bg-zinc-800 hover:text-white transition px-4 py-1 border-2 border-zinc-800 rounded-full">
          حذف حساب کاربری
        </button>
      </div>
    </div>
  );
}
