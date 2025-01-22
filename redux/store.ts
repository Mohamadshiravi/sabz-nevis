import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import postReducer from "./slices/post";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});
store.subscribe(() => {
  console.log("store=>", store.getState());
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {todos : todoState}
export type AppDispatch = typeof store.dispatch;

export default store;
