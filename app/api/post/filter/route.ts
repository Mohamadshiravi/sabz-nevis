import ConnectToDB from "@/DB/connectToDB";
import { postModel } from "@/models/index";

export const revalidate = 0;

export async function GET(req: Request) {
  try {
    await ConnectToDB();

    const { searchParams } = new URL(req.url);

    const filter = searchParams.get("filter");
    const category = searchParams.get("category");

    const user = searchParams.get("user");

    switch (filter) {
      case "mightLike": {
        const posts = await postModel
          .find(
            { status: "completed", category },
            "-__v -imagesID -status -body -imagesUrl"
          )
          .populate("user", "displayName username avatar")
          .populate("category", "name");

        return Response.json({ message: "mightlike post", posts });
      }
      case "top": {
        const allPosts = await postModel
          .find(
            { status: "completed" },
            "-__v -imagesID -status -body -imagesUrl"
          )
          .populate("user", "displayName username avatar")
          .populate("category", "name");

        // مرتب‌سازی پست‌ها بر اساس تعداد لایک‌ها (از بیشتر به کمتر)
        allPosts.sort((a, b) => b.likes.length - a.likes.length);

        // محدود کردن نتایج به ۱۰ مورد
        const posts = allPosts.slice(0, 10);

        return Response.json({ message: "top posts", posts });
      }
      case "userPost": {
        const posts = await postModel
          .find(
            { status: "completed", user },
            "-__v -imagesID -status -body -imagesUrl"
          )
          .populate("user", "displayName username avatar")
          .populate("category", "name")
          .sort("-1");

        return Response.json({ message: "user posts", posts });
      }
      case "category": {
        const posts = await postModel
          .find(
            { status: "completed", category },
            "-__v -imagesID -status -body -imagesUrl"
          )
          .populate("user", "displayName username avatar")
          .populate("category", "name");

        return Response.json({ message: "categori filtered post", posts });
      }
      default: {
        const posts = await postModel
          .find(
            { status: "completed" },
            "-__v -imagesID -status -body -imagesUrl"
          )
          .populate("user", "displayName username avatar");

        return Response.json({ message: "all post", posts });
      }
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
