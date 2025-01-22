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
  },
});

export default slice.reducer;
