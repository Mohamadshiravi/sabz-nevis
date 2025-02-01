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

    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  }
);

export const addListToServer = createAsyncThunk(
  "lists/addListToServer",
  async (payload: { name: string; status: boolean }) => {
    const res = await axios.post("/api/list", {
      name: payload.name,
      status: payload.status ? "public" : "private",
    });

    if (res.status === 201) {
      return res.data;
    } else {
      return null;
    }
  }
);

export const togglePostToList = createAsyncThunk(
  "lists/togglePostToList",
  async (payload: { postId: string; listId: string }) => {
    const res = await axios.put(`/api/list/${payload.listId}`, {
      postId: payload.postId,
    });

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
    builder.addCase(addListToServer.fulfilled, (state, action) => {
      if (state.data) {
        state.data?.push(action.payload.list);
      }
    });
    builder.addCase(togglePostToList.fulfilled, (state, action) => {
      if (state.data) {
        state.data = state.data?.map((list) => {
          return list._id === action.payload.list._id
            ? action.payload.list
            : list;
        });
      }
    });
  },
});

export default slice.reducer;
