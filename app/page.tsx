import FirstLoading from "@/components/template/loading/firstLoading";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <div>
      <FirstLoading />
      {await new Promise((resolve) => setTimeout(resolve, 2000))}
      {redirect("/home")}
    </div>
  );
}
