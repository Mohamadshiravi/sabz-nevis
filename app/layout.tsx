import type { Metadata, Viewport } from "next";
import "@/style/globals.css";
import Header from "@/components/module/header";

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
      <body className={`antialiased vazir-regular text-virgoolText-800`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
