import { UserModelType } from "@/models/user";
import axiosInatnce from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  "user/fetchUserDataFromServer",
  async () => {
    const res = await axiosInatnce.get("/api/auth/me");

    return res.data;
  }
);

export const updateUserDataToServer = createAsyncThunk(
  "user/updateUserDataToServer",
  async (payload: any) => {
    const res = await axiosInatnce.post("/api/auth/me/update", payload);
    return res.data;
  }
);

export const addAvatarToServer = createAsyncThunk(
  "user/addAvatarToServer",
  async (payload: any) => {
    const res = await axiosInatnce.post("/api/auth/me/update/avatar", payload);
    return res.data;
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (id: string) => {
    const res = await axiosInatnce.post("/api/user/follow", { id });
    return res.data;
  }
);
export const UnfollowUser = createAsyncThunk(
  "user/UnfollowUser",
  async (id: string) => {
    const res = await axiosInatnce.post("/api/user/unfollow", { id });
    return res.data;
  }
);

const slice = createSlice({
  name: "user",
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
    builder.addCase(fetchUserDataFromServer.rejected, (state) => {
      state.error = "unAuth";
      state.loading = false;
    });
    builder.addCase(updateUserDataToServer.fulfilled, (state, action) => {
      state.data = action.payload.user;
    });
    builder.addCase(addAvatarToServer.fulfilled, (state, action) => {
      state.data = action.payload.user;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.data = action.payload.user;
    });
    builder.addCase(UnfollowUser.fulfilled, (state, action) => {
      state.data = action.payload.user;
    });
  },
});

export default slice.reducer;
export const { changeTheme, getTheme } = slice.actions;
