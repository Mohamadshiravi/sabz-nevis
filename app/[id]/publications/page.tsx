"use client";

import PrimaryBtn from "@/components/module/primaryBtn";
import { useTypedSelector } from "@/redux/typedHooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function MainProfileSction({
  params,
}: {
  params: { id: string };
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
    const currentUser = await axios.get(`/api/users/${params.id.slice(3)}`);

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
            {isUserHere ? (
              <>
                <h4>
                  شما هنوز انتشاراتی در ویرگول نساخته اید. همین حالا اقدام به
                  ساخت اولین انتشارات خود کنید.
                </h4>
                <PrimaryBtn>
                  ساخت انتشارات
                  <IoIosArrowBack />
                </PrimaryBtn>
              </>
            ) : (
              <h4>
                <span className="vazir-bold px-1">
                  {userData.data?.displayName || "این کاربر"}
                </span>{" "}
                هنوز انتشاراتی در ویرگول نساخته بعد از ساخت اولین انتشارات آن را
                در اینجا نمایش می‌دهیم.
              </h4>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 w-full lg:w-8/12 w-full lg:px-0 sm:px-20 px-4 lg:m-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="w-full h-[50px] bg-zinc-100 dark:bg-zinc-800"></div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
