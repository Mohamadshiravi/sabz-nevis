import postModel from "@/models/post";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { title, body, postID } = await req.json();

    console.log(postID);

    if (!postID) {
      const newPost = await postModel.create({
        title,
        body,
        status: "draft",
        user: isUserAuth._id,
      });
      console.log(newPost);
      return Response.json(
        { message: "post created", id: newPost._id },
        { status: 201 }
      );
    } else {
      const updatedPost = await postModel.findOneAndUpdate(
        { _id: postID },
        {
          title,
          body,
        }
      );
      return Response.json({ message: "post updated", id: updatedPost._id });
    }
  } catch (error) {
    console.log(error);

    return Response.json({ message: "server error" }, { status: 500 });
  }
}
