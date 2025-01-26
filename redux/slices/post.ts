import { PostModelType } from "@/models/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface userState {
  loading: boolean;
  data: PostModelType[] | null;
  error: null | string;
}

const initialState: userState = {
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
  async (payload: {
    id: string;
    name: string;
    body: string;
    avatar: string;
    replyTo?: string;
  }) => {
    console.log(payload);

    const res = await axios.post("/api/post/comment", {
      postId: payload.id,
      name: payload.name,
      body: payload.body,
      avatar: payload.avatar,
      replyTo: payload.replyTo || null,
    });
    if (res.status === 201) {
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
  },
});

export default slice.reducer;
