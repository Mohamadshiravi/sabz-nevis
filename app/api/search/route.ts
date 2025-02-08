import { categoryModel, listModel, postModel, userModel } from "@/models";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const vord = searchParams.get("vord");

  try {
    switch (type) {
      case "post": {
        const data = await postModel
          .find(
            {
              title: { $regex: vord, $options: "i" },
              status: "completed",
            },
            "-__v -imagesID -status -body -imagesUrl"
          )
          .populate("user", "displayName username avatar")
          .populate("category", "name");

        return Response.json(
          { message: "filtered data", data },
          { status: 200 }
        );
      }
      case "users": {
        const data = await userModel.find(
          {
            displayName: { $regex: vord, $options: "i" },
          },
          "username displayName avatar"
        );

        return Response.json(
          { message: "filtered data", data },
          { status: 200 }
        );
      }
      case "lists": {
        const data = await listModel
          .find(
            {
              name: { $regex: vord, $options: "i" },
              status: "public",
            },
            "-__v"
          )
          .populate("posts", "cover")
          .populate("user", "username");

        return Response.json(
          { message: "filtered data", data },
          { status: 200 }
        );
      }
      case "category": {
        const data = await categoryModel.find(
          {
            name: { $regex: vord, $options: "i" },
          },
          "-__v"
        );

        return Response.json(
          { message: "filtered data", data },
          { status: 200 }
        );
      }
    }
    return Response.json({ message: "select typed" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
