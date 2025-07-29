"use client";

import { togglePostToList, fetchListsFromServer } from "@/redux/slices/list";
import { useTypedDispatch, useTypedSelector } from "@/redux/typedHooks";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";

export default function SavePostDropDown({
  Close,
  postId,
}: {
  Close: () => void;
  postId: string | null;
}) {
  const dispatch = useTypedDispatch();

  const { loading, data } = useTypedSelector((state) => state.lists);
  const username = useTypedSelector((state) => state.user.data)?.username;

  useEffect(() => {
    if (!data) {
      dispatch(fetchListsFromServer());
    }
  }, []);

  useEffect(() => {
    if (
      !data?.some((list) => list.posts.some((post) => post._id === postId)) &&
      data &&
      username
    ) {
      SavePostHandler(data[0]._id);
    }
  }, [username]);

  return (
    <>
      <section
        onClick={Close}
        className="w-full h-screen fixed top-0 left-0 z-40"
      ></section>
      <div className="w-[250px] z-40 bottom-10 left-0 absolute shadow-lg border border-zinc-200 dark:border-zinc-800 transition dark:bg-dark-color-800 bg-white rounded-md rounded-bl-none">
        {username ? (
          <>
            <span className="w-[13px] h-[13px] bg-white absolute border-b border-r border-zinc-200 transition dark:border-zinc-800 dark:bg-dark-color-800 rotate-45 bottom-[-7px] left-1"></span>
            {loading ? (
              <div className="text-sm p-4">در حال دریافت لیست های شما ...</div>
            ) : (
              <>
                {data?.map((e, i) => (
                  <div key={i} className="flex flex-col gap-4 p-4">
                    <button
                      onClick={() => SavePostHandler(e._id)}
                      className="flex items-center justify-between w-full cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="border w-[20px] h-[20px] flex items-center justify-center block text-xs text-my-green-600 rounded-xs border-zinc-200 dark:border-zinc-800">
                          {e.posts.some((post) => post._id === postId) && (
                            <FaCheck />
                          )}
                        </span>
                        <span className="text-sm dark:text-my-text-200 vazir-medium">
                          {e.name}
                        </span>
                      </div>
                      {e.status === "private" && (
                        <RiLock2Fill className="text-base" />
                      )}
                    </button>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <h4 className="text-sm p-2">ابتدا وارد اکانت خود شوید</h4>
        )}
      </div>
    </>
  );
  async function SavePostHandler(listId: string) {
    if (postId) {
      dispatch(togglePostToList({ postId, listId }));
    }
  }
}
