"use client";

import Post from "@/components/module/post";
import PostLoading from "@/components/module/skeletonLoadings/post";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RenderPostOfList({ listId }: { listId: string }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    FetchPostsFromServer();
  }, []);

  async function FetchPostsFromServer() {
    try {
      const res = await axios.get(`/api/list/${listId}`);
      setPosts(res.data.list.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? (
        Array.from({ length: 4 }).map((e, i) => <PostLoading key={i} />)
      ) : (
        <div>
          {posts.length === 0 ? (
            <div>پستی موجود نیست</div>
          ) : (
            posts?.map((e, i) => (
              <Post
                reRenderPosts={FetchPostsFromServer}
                isListPost
                border
                key={i}
                data={e}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
