import { PostModelType } from "@/models/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface likedPostState {
  loading: boolean;
  data: PostModelType[] | null;
  error: null | string;
}

const initialState: likedPostState = {
  data: null,
  loading: true,
  error: null,
};

export const fetchLikedPosts = createAsyncThunk(
  "likedposts/fetchLikedPosts",
  async () => {
    const res = await axios.get("/api/post/like");
    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  }
);

export const unLikePostFromLikedPost = createAsyncThunk(
  "likedposts/unLikePost",
  async (postId: string) => {
    const res = await axios.post("/api/post/unlike", {
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
  name: "likedposts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLikedPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.posts;
    });
    builder.addCase(fetchLikedPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unLikePostFromLikedPost.fulfilled, (state, action) => {
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
