import PrimaryBtn from "@/components/module/primaryBtn";
import ConnectToDB from "@/DB/connectToDB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/auth/tokenControl";
import { cookies } from "next/headers";
import { IoIosArrowBack } from "react-icons/io";

export default async function MainProfileSction({
  params,
}: {
  params: { id: string };
}) {
  await ConnectToDB();
  const decodedUserId = decodeURIComponent(params.id).slice(1);
  const theUserProfile = await userModel.findOne({ username: decodedUserId });

  let isUserLogedIn = null;
  let isUserHere = null;
  const token = cookies().get("token")?.value;
  if (token) {
    const isTokenValid = VerifyAccessToken(token);
    if (isTokenValid) {
      isUserLogedIn = true;
      if (isTokenValid.phone === theUserProfile.phone) {
        isUserHere = true;
      }
    }
  }
  return (
    <div className="flex flex-col items-center mt-12 gap-3 px-4 md:text-right text-center">
      {isUserHere ? (
        <>
          <h4>
            شما هنوز انتشاراتی در ویرگول نساخته اید. همین حالا اقدام به ساخت
            اولین انتشارات خود کنید.
          </h4>
          <PrimaryBtn>
            ساخت انتشارات
            <IoIosArrowBack />
          </PrimaryBtn>
        </>
      ) : (
        <h4>
          <span className="vazir-bold px-1">
            {theUserProfile.displayName || "این کاربر"}
          </span>{" "}
          هنوز انتشاراتی در ویرگول نساخته بعد از ساخت اولین انتشارات آن را در
          اینجا نمایش می‌دهیم.
        </h4>
      )}
    </div>
  );
}
