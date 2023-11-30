import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "../actions/authService";
import { useSelector, useDispatch } from "react-redux";
import { addAlert } from "./alertSlice";
import { json } from "react-router-dom";

// Get user from localStorage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  isAuthenticated: null,
  userToken,
  error: null,
  success: false,
  isAuthenticated: false,
  errorMsg: false,
  errorValue: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.isAuthenticated = false;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
      state.isAuthenticated = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;

      payload.response.data.errors.map((error) => {
        console.log(error);
      });
      state.errorValue = payload.response.data.errors[0];
    },

    // registerUser

    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.errorMsg = true;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
