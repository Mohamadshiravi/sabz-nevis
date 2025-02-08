import { PostModelType } from "@/models/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface postState {
  loading: boolean;
  data: PostModelType[] | null;
  error: null | string;
}

const initialState: postState = {
  data: null,
  loading: true,
  error: null,
};

export const fetchPostFromServer = createAsyncThunk(
  "posts/fetchPostFromServer",
  async () => {
    const res = await axios.get("/api/post");
    if (res.status === 200) {
      return res.data.posts;
    } else {
      return null;
    }
  }
);

export const AddCommentToPost = createAsyncThunk(
  "posts/AddCommentToPost",
  async (payload: { id: string; body: string; replyTo?: string }) => {
    const res = await axios.post("/api/post/comment", {
      postId: payload.id,
      body: payload.body,
      replyTo: payload.replyTo || null,
    });
    if (res.status === 201) {
      return res.data;
    } else {
      return null;
    }
  }
);

export const toggleLikePost = createAsyncThunk(
  "posts/toggleLikePost",
  async (postId: string) => {
    const res = await axios.post("/api/post/like", {
      postId,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  }
);

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostFromServer.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.loading = false;
      }
    });
    builder.addCase(fetchPostFromServer.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(AddCommentToPost.fulfilled, (state, action) => {
      return state;
    });
    builder.addCase(toggleLikePost.fulfilled, (state, action) => {
      if (state.data) {
        state.data = state.data?.map((post) => {
          return post._id === action.payload.post._id
            ? action.payload.post
            : post;
        });
      }
    });
  },
});

export default slice.reducer;
