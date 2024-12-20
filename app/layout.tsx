import type { Metadata } from "next";
import "@/style/globals.css";
import Header from "@/components/module/header";

export const metadata: Metadata = {
  title: "کپی شده وبسایت ویرگول",
  description: "این وبسایت صرفا یک کپی از وبسایت ویرگول برای نمونه کار است",
  icons: {
    icon: "/images/logo.webp",
  },
  themeColor: "#107ABE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className={`antialiased yekan-regular`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
