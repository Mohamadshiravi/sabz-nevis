import { writeFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formdata = await req.formData();
    const img = formdata.get("img");

    if (!img || !(img instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    const bufferedImg = Buffer.from(await img.arrayBuffer());
    const imgName = Date.now() + "-" + img.name;

    const imgPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "images",
      imgName
    );
    writeFileSync(imgPath, bufferedImg);

    return NextResponse.json(
      {
        message: "img added",
        path: `/uploads/images/${imgName}`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
