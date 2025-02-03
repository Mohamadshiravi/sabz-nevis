export const revalidate = 0;

export async function GET() {
  try {
    return Response.json(
      { message: "You logedout" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token='';path=/;maxAge=${0};`,
        },
      }
    );
  } catch (error) {
    return Response.json({ message: "error" }, { status: 500 });
  }
}
