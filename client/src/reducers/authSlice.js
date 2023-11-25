import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../actions/authActions";
import { removealert } from "./alertSlice";
import { useDispatch } from "react-redux";

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  name: "",
  msg: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateName: (state, { payload }) => {
      state.name = payload.name;
    },
  },
  extraReducers: {
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userInfo = payload.data;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(payload[0].msg);
      // useDispatch(removealert(payload[0].msg));
    },
  },
});

export const { regsuccess, regfail, updateName } = authSlice.actions;
export default authSlice.reducer;
