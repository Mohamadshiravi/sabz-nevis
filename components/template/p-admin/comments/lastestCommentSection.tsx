"use client";

import { CommentModelType } from "@/models/comment";
import axios from "axios";
import { useEffect, useState } from "react";
import CommentLoading from "@/components/module/skeletonLoadings/comments";
import CommentField from "./commentsField";

export default function LastestCommentSection({
  isSimple,
}: {
  isSimple?: boolean;
}) {
  const [acceptedComments, setAcceptedComments] = useState<
    [] | CommentModelType[]
  >([]);

  const [queuedComments, setQueuedComments] = useState<[] | CommentModelType[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchLastestAcceptedComment();
    if (!isSimple) {
      FetchLastestQueuedComment();
    }
  }, []);

  async function FetchLastestAcceptedComment() {
    setLoading(true);
    try {
      const res = await axios.get(
        "/api/post/comment?start=0&&end=1&&status=accepted"
      );

      setQueuedComments(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function FetchLastestQueuedComment() {
    setLoading(true);
    try {
      const res = await axios.get(
        "/api/post/comment?start=0&&end=1&&status=queued"
      );

      setAcceptedComments(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <>
      {!isSimple && (
        <div className="mt-10 sm:p-6">
          <h3 className="vazir-bold text-xl">اخرین کامنت های تایید نشده</h3>
          <div className="flex flex-col gap-3 mt-4">
            {loading ? (
              Array.from({ length: 3 }).map((e, i) => (
                <CommentLoading key={i} />
              ))
            ) : acceptedComments.length === 0 ? (
              <h4 className="text-myText-500">همه کامنت ها تایید شده اند</h4>
            ) : (
              acceptedComments.map((e, i) => (
                <CommentField
                  reRenderComments={FetchLastestQueuedComment}
                  key={i}
                  data={e}
                />
              ))
            )}
          </div>
        </div>
      )}
      <div className="mt-10 sm:p-6">
        <h3 className="vazir-bold text-xl">اخرین کامنت های ثبت شده</h3>
        <div className="flex flex-col gap-3 mt-4">
          {loading ? (
            Array.from({ length: 3 }).map((e, i) => <CommentLoading key={i} />)
          ) : queuedComments.length === 0 ? (
            <h4 className="text-myText-500">هیچ کامنتی ثبت نشده</h4>
          ) : (
            queuedComments.map((e, i) => (
              <CommentField
                reRenderComments={FetchLastestAcceptedComment}
                key={i}
                data={e}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
