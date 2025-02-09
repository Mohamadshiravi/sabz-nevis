import AllCommentSection from "@/components/template/p-admin/comment/allCommentsSection";
import LastestCommentSection from "@/components/template/p-admin/comment/lastestCommentSection";

export default function AdminPanelDashboard() {
  return (
    <section>
      <LastestCommentSection isSimple />
      <AllCommentSection />
    </section>
  );
}
