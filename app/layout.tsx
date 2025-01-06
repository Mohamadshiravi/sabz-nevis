import type { Metadata, Viewport } from "next";
import "@/style/globals.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/redux/provider";
import GetTheme from "@/components/module/getTheme/getTheme";

export const metadata: Metadata = {
  title: "وبسایت ویرگول Clone",
  description: "این وبسایت صرفا یک کپی از وبسایت ویرگول برای نمونه کار است",
  icons: {
    icon: "/images/logo.webp",
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
        className={`antialiased vazir-regular text-virgoolText-800 bg-white dark:bg-darkColor-800 dark:text-white`}
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
