export default function SettingsNotif() {
  return (
    <div>
      <h2 className="text-base text-virgoolText-600 mt-8">
        انتخاب کنید که ویرگول در چه مواردی می‌تواند برای شما ایمیل ارسال کند.
      </h2>
      <div className="flex flex-col gap-10 pt-8 lg:pb-10 pb-20">
        <label className="flex items-center justify-between">
          <span className="vazir-medium">وقتی یک نفر شما را دنبال می‌کند</span>
          <input type="checkbox" />
        </label>
        <label className="flex items-center justify-between">
          <span className="vazir-medium">
            وقتی بر روی نوشته شما پاسخی ارسال کنند
          </span>
          <input type="checkbox" />
        </label>
        <label className="flex items-center justify-between">
          <span className="vazir-medium">وقتی نوشته شما را لایک می‌کنند</span>
          <input type="checkbox" />
        </label>
        <label className="flex items-center justify-between">
          <span className="vazir-medium">راهنمایی و آپدیت‌های ویرگول</span>
          <input type="checkbox" />
        </label>
        <label className="flex items-center justify-between">
          <span className="vazir-medium">خبرنامه هفتگی بهترین مطالب</span>
          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
}
