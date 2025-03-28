import { postModel } from "@/models/index";
import IsUserAuthentication from "@/utils/auth/authUser";
import ImageKit from "imagekit";
const cheerio = require("cheerio");

export const revalidate = 0;

function extractImageTagsSrc(content: string): string[] {
  const $ = cheerio.load(content);
  const imageUrls: string[] = [];
  $("img").each((index: any, element: any) => {
    const src = $(element).attr("src");
    if (src) {
      imageUrls.push(src);
    }
  });
  return imageUrls;
}

async function getFileIdFromImageKit(fileName: string): Promise<string | null> {
  try {
    const result = await imagekit.listFiles({
      name: fileName,
    });
    return result.length > 0 ? (result[0] as any).fileId : null;
  } catch (error) {
    console.error("Error fetching file ID:", error);
    return null;
  }
}

async function deleteImageFromImageKit(fileId: string) {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    return null;
  }
}

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.CLOUD_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  try {
    const { title, body, postID } = await req.json();

    if (!postID) {
      const newPost = await postModel.create({
        title,
        body,
        status: "draft",
        user: isUserAuth._id,
      });
      return Response.json(
        { message: "post created", id: newPost._id },
        { status: 201 }
      );
    } else {
      const currentPost = await postModel
        .findOne({ _id: postID }, "-_id user imagesID imagesUrl")
        .populate("user", "phone");

      if (currentPost) {
        //check access
        if (currentPost.user.phone !== isUserAuth.phone) {
          return Response.json(
            { message: "you dont have Access" },
            { status: 403 }
          );
        }

        //delete unused photo from cloud

        const imagesSrc = extractImageTagsSrc(body);

        currentPost.imagesUrl.map(async (e: string) => {
          if (!imagesSrc.includes(e)) {
            const fileName = e.split("/");

            const fileId = await getFileIdFromImageKit(
              fileName[fileName.length - 1]
            );

            if (fileId) {
              await deleteImageFromImageKit(fileId);
              await postModel.findOneAndUpdate(
                { _id: postID },
                {
                  $pull: { imagesID: fileId },
                }
              );
              await postModel.findOneAndUpdate(
                { _id: postID },
                {
                  $pull: { imagesUrl: e },
                }
              );
            }
          }
        });

        if (imagesSrc.length === 0 && currentPost.imagesID.length !== 0) {
          currentPost.imagesID.map(async (imgId: any) => {
            await deleteImageFromImageKit(imgId);

            await postModel.findOneAndUpdate(
              { _id: postID },
              {
                $pull: { imagesID: imgId },
              }
            );
          });

          currentPost.imagesUrl.map(async (url: any) => {
            await postModel.findOneAndUpdate(
              { _id: postID },
              {
                $pull: { imagesUrl: url },
              }
            );
          });
        }
      } else {
        return Response.json({ message: "post not found" }, { status: 404 });
      }

      await postModel.findOneAndUpdate(
        { _id: postID },
        {
          status: "draft",
          title,
          body,
        }
      );
      const post = await postModel.findOne({ _id: postID }, "_id imagesUrl");
      return Response.json({
        message: "post updated",
        id: post._id,
        images: post.imagesUrl,
      });
    }
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const isUserAuth = await IsUserAuthentication();

  if (!isUserAuth) {
    return Response.json({ message: "user unAuth" }, { status: 401 });
  }

  try {
    const draftPosts = await postModel
      .find(
        {
          user: isUserAuth._id,
          status: "draft",
        },
        "title updatedAt"
      )
      .populate("user", "username")
      .sort({ createdAt: -1 });

    return Response.json({ draftPosts });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
