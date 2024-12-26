import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: () => {},
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {todos : todoState}
export type AppDispatch = typeof store.dispatch;

export default store;
