import { CommentModelType } from "@/models/comment";

import Comment from "./comment";

export default function Comments({
  comments,
}: {
  comments: CommentModelType[];
}) {
  return (
    <div className="mt-10 flex flex-col gap-3">
      {comments
        .filter((e) => e.status === "accepted")
        .map((e, i) => (
          <Comment key={i} data={e} />
        ))}
    </div>
  );
}
