import { ListModelType } from "@/models/list";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ListState {
  loading: boolean;
  data: ListModelType[] | null;
  error: null | string;
}

const initialState: ListState = {
  data: null,
  loading: true,
  error: null,
};

export const fetchListFromServer = createAsyncThunk(
  "lists/fetchListFromServer",
  async () => {
    const res = await axios.get("/api/list");

    console.log(res);

    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  }
);

const slice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListFromServer.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.lists;
    });
    builder.addCase(fetchListFromServer.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default slice.reducer;
