import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, useAppSelector } from "../store";
import { IUser } from "../../interfaces/interfaces";

export interface IAuth {
  user: null | IUser;
  token: string | null;
}

const initialState: IAuth = {
  user: null,
  token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});
// console.log(us);

export function getUser() {
  return function (dispatch: AppDispatch) {
    const token = useAppSelector((state) => state.auth.token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.post("https://frost.runtime.kz/api/auth/user").then((resp) => {
        dispatch(setUser(resp.data));
      });
    }
  };
}

export function useUser() {
  return useAppSelector((state) => state.auth.user);
}

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
