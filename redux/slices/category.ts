import { CategoryModelType } from "@/models/category";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInatnce from "@/utils/axios";

interface categoriestate {
  loading: boolean;
  data: CategoryModelType[] | null;
  error: null | string;
}

const initialState: categoriestate = {
  data: null,
  loading: true,
  error: null,
};

export const fetchCategoriesFromServer = createAsyncThunk(
  "categories/fetchCategoriesFromServer",
  async () => {
    const res = await axiosInatnce.get("/api/category");
    if (res.status === 200) {
      return res.data.categories;
    } else {
      return null;
    }
  }
);

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesFromServer.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.loading = false;
      }
    });
    builder.addCase(fetchCategoriesFromServer.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
  },
});

export default slice.reducer;
