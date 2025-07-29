import { PostModelType } from "@/models/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";

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
    const res = await axiosInstance.get("/api/post/like");
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
    builder.addCase(fetchLikedPosts.pending, (state) => {
      state.loading = true;
    });
  },
});

export default slice.reducer;
