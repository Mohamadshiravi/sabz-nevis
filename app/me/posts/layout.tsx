import DesktopNavbar from "@/components/module/dekstopNavbar";
import Footer from "@/components/module/footer";
import Header from "@/components/module/header";
import MobileNavbar from "@/components/module/navbar";
import PostsNavbar from "@/components/template/me/posts/postsNavbar";
import PostsTitle from "@/components/template/me/posts/postsTitle";

export default async function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main
        className={`lg:px-0 px-4 grid lg:grid-cols-[2fr_7fr_3fr] grid-cols-[1fr] gap-6`}
      >
        <DesktopNavbar />
        <section className="w-full overflow-hidden">
          <PostsTitle />
          <PostsNavbar />
          {children}
        </section>
        <Footer isSimple />
      </main>
      <MobileNavbar />
    </>
  );
}
