"use client";

import PrimaryBtn from "@/components/module/primaryBtn";
import PostLoading from "@/components/module/skeletonLoadings/post";
import { useTypedSelector } from "@/redux/typedHooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function MainProfileSction({
  params,
}: {
  params: { username: string };
}) {
  const [loading, setLoading] = useState(true);
  const [isUserHere, setIsUserHere] = useState(false);
  const userData = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (userData.data !== null) {
      FetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [userData.data]);

  async function FetchCurrentUser() {
    setLoading(true);
    const currentUser = await axios.get(
      `/api/users/${params.username.slice(3)}`
    );

    if (currentUser.data.user.phone === userData.data?.phone) {
      setIsUserHere(true);
    }

    setLoading(false);
  }
  return (
    <>
      <section className="pt-12 pb-24 bg-white dark:bg-darkColor-800">
        {!loading ? (
          <div className="flex flex-col items-center mt-12 gap-3 px-4 md:text-right text-center">
            {!isUserHere ? (
              <h4>
                <span className="vazir-bold px-1">
                  {userData.data?.displayName || "این کاربر"}
                </span>{" "}
                هنوز پستی در سبز نویس ننوشته بعد از انتشار اولین پست، آن را در
                اینجا نمایش می‌دهیم.
              </h4>
            ) : (
              <>
                <h4>
                  شما هنوز پستی در سبزنویس ننوشته‌اید. همین حالا اقدام به نوشتن
                  اولین پست خود کنید.
                </h4>
                <PrimaryBtn width="w-[200px]">
                  نوشتن پست
                  <IoIosArrowBack />
                </PrimaryBtn>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:w-8/12 w-full lg:px-0 sm:px-20 px-4 m-auto">
            {Array.from({ length: 3 }).map((e, i) => (
              <PostLoading key={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
