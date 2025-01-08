import { UserModelType } from "@/models/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface userState {
  theme: "dark" | "light" | null;
  loading: boolean;
  data: UserModelType | null;
  error: null | string;
}

const initialState: userState = {
  theme: null,
  data: null,
  loading: true,
  error: null,
};

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

export const updateUserDataToServer = createAsyncThunk(
  "users/updateUserDataToServer",
  async (payload: any) => {
    const res = await axios.post("/api/auth/me/update", payload);
    return res.data;
  }
);

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      localStorage.theme = action.payload;
      const theme = localStorage.getItem("theme");
      if (theme === "light" || theme === null) {
        document.documentElement.className = "light";
        state.theme = "light";
      } else {
        document.documentElement.className = "dark";
        state.theme = "dark";
      }
    },
    getTheme: (state) => {
      const theme = localStorage.getItem("theme");
      if (theme === "light" || theme === null) {
        document.documentElement.className = "light";
        state.theme = "light";
      } else {
        document.documentElement.className = "dark";
        state.theme = "dark";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDataFromServer.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.data = action.payload.user;
        state.loading = false;
      } else {
        state.data = null;
      }
    });
    builder.addCase(fetchUserDataFromServer.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(updateUserDataToServer.fulfilled, (state, action) => {
      state.data = action.payload.user;
    });
  },
});

export default slice.reducer;
export const { changeTheme, getTheme } = slice.actions;
