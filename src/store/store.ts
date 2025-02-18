import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "./slices/authSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    auth: authSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
