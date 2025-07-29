"use client";

import { CommentModelType } from "@/models/comment";
import axios from "axios";
import { useEffect, useState } from "react";
import CommentLoading from "@/components/module/skeletonLoadings/comments";
import CommentField from "./commentsField";

export default function AllCommentSection() {
  const [acceptedComments, setAcceptedComments] = useState<
    [] | CommentModelType[]
  >([]);

  const [queuedComments, setQueuedComments] = useState<[] | CommentModelType[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchLastestAccpetedComment();
    FetchLastestQueuedComment();
  }, []);

  async function FetchLastestAccpetedComment() {
    setLoading(true);
    try {
      const res = await axios.get("/api/post/comment?status=queued");

      setAcceptedComments(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function FetchLastestQueuedComment() {
    setLoading(true);
    try {
      const res = await axios.get("/api/post/comment?status=accepted");

      setQueuedComments(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="mt-10 sm:p-6">
        <h3 className="vazir-bold text-xl">کامنت های تایید نشده</h3>
        <div className="flex flex-col gap-3 mt-4">
          {loading ? (
            Array.from({ length: 3 }).map((e, i) => <CommentLoading key={i} />)
          ) : acceptedComments.length === 0 ? (
            <h4 className="text-my-text-500">همه کامنت ها تایید شده اند</h4>
          ) : (
            acceptedComments.map((e, i) => (
              <CommentField
                reRenderComments={() => {
                  FetchLastestAccpetedComment();
                  FetchLastestQueuedComment();
                }}
                key={i}
                data={e}
              />
            ))
          )}
        </div>
      </div>
      <div className="mt-10 sm:p-6">
        <h3 className="vazir-bold text-xl">تمام کامنت های ثبت شده</h3>
        <div className="flex flex-col gap-3 mt-4">
          {loading ? (
            Array.from({ length: 3 }).map((e, i) => <CommentLoading key={i} />)
          ) : queuedComments.length === 0 ? (
            <h4 className="text-my-text-500">هیچ کامنتی ثبت نشده</h4>
          ) : (
            queuedComments.map((e, i) => (
              <CommentField
                reRenderComments={FetchLastestAccpetedComment}
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
