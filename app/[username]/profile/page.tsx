"use client";

import Post from "@/components/module/post";
import PrimaryBtn from "@/components/module/primaryBtn";
import PostLoading from "@/components/module/skeletonLoadings/post";
import { PostModelType } from "@/models/post";
import { useTypedSelector } from "@/redux/typedHooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function MainProfileSction(
  props: {
    params: Promise<{ username: string }>;
  }
) {
  const params = use(props.params);
  const [loading, setLoading] = useState(true);
  const [isUserHere, setIsUserHere] = useState(false);
  const [userPosts, setUserPosts] = useState<[] | PostModelType[]>([]);

  const [userDisplayName, setUserDisplayName] = useState("");

  const userData = useTypedSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    FetchCurrentUser();
  }, [userData.data]);

  async function FetchCurrentUser() {
    setLoading(true);
    try {
      const currentUser = await axios.get(
        `/api/users/${params.username.slice(3)}`
      );

      setUserDisplayName(currentUser.data.user.displayName);
      FetchUserPosts(currentUser.data.user._id);

      if (currentUser.data.user.phone === userData.data?.phone) {
        setIsUserHere(true);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  async function FetchUserPosts(id: string) {
    try {
      const res = await axios.get(
        `/api/post/filter?filter=userPost&user=${id}`
      );
      setUserPosts(res.data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <>
      <section className="pt-12 pb-24 bg-white dark:bg-darkColor-800">
        <div className="flex flex-col gap-8 lg:w-8/12 w-full lg:px-0 sm:px-20 px-4 m-auto">
          {loading ? (
            Array.from({ length: 3 }).map((e, i) => <PostLoading key={i} />)
          ) : userPosts.length !== 0 ? (
            userPosts.map((e, i) => <Post key={i} data={e} />)
          ) : (
            <div className="flex flex-col items-center mt-12 gap-3 px-4 md:text-right text-center">
              {!isUserHere ? (
                <h4>
                  <span className="vazir-bold px-1">
                    {userDisplayName || "این کاربر"}
                  </span>{" "}
                  هنوز پستی در سبز نویس ننوشته بعد از انتشار اولین پست، آن را در
                  اینجا نمایش می‌دهیم.
                </h4>
              ) : (
                <>
                  <h4>
                    شما هنوز پستی در سبزنویس ننوشته‌اید. همین حالا اقدام به
                    نوشتن اولین پست خود کنید.
                  </h4>
                  <PrimaryBtn
                    onPress={() => router.push("/post/create")}
                    width="w-[200px]"
                  >
                    نوشتن پست
                    <IoIosArrowBack />
                  </PrimaryBtn>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
