import type { Metadata, Viewport } from "next";
import "@/style/globals.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/redux/provider";
import GetTheme from "@/components/module/getTheme/getTheme";

export const metadata: Metadata = {
  title: "سبز نویس | هر چی میخوای بنویس",
  description: "سبز نویس یک وبسایت برای نوشتن وبلاگ های خودتون",
  icons: {
    icon: "/images/sabz-logo.png",
  },
};

export const viewport: Viewport = { themeColor: "#107ABE" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body
        className={`antialiased text-base select-none vazir-regular text-myText-800 bg-white dark:bg-darkColor-800 dark:text-white`}
      >
        <ReduxProvider>
          <GetTheme />
          {children}
          <ToastContainer stacked />
        </ReduxProvider>
      </body>
    </html>
  );
}
