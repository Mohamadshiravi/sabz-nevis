import { UserModelType } from "@/models/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: UserModelType | null = null;

export const fetchUserDataFromServer = createAsyncThunk(
  "users/fetchUserDataFromServer",
  async () => {
    const res = await axios.get("/api/auth/me");
    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  }
);

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDataFromServer.fulfilled, (state, action) => {
      if (action.payload.user) {
        return action.payload.user;
      } else {
        return null;
      }
    });
  },
});

export default slice.reducer;
