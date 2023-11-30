import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true,
      actionCreatorCheck: true,
    }).concat(thunk),
});
