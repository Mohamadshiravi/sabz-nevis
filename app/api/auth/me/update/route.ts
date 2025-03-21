import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import IsUserAuthentication from "@/utils/auth/authUser";

export async function POST(req: Request) {
  const isUserAuth = await IsUserAuthentication();
  if (!isUserAuth) {
    return Response.json({ message: "unAuth" }, { status: 401 });
  }

  const {
    phone,
    displayName,
    about,
    gender,
    birthDay,
    username,
    email,
    password,
    xProfile,
    linkedin,
  } = await req.json();

  try {
    await ConnectToDB();
    const user = await userModel.findOneAndUpdate(
      { phone: isUserAuth.phone },
      {
        phone,
        displayName,
        about,
        gender,
        birthDay,
        username,
        email,
        password,
        xProfile,
        linkedin,
      },
      { new: true }
    );

    return new Response(JSON.stringify({ message: "user updated", user }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "server error" }), {
      status: 500,
    });
  }
}
