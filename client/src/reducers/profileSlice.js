import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../actions/profileService";

const initialState = {
  loading: true,
  profiles: [],
  error: {},
  isProfile: undefined,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    Logout: (state) => {
      state.profiles = [null];
      console.log("hi");
    },
  },
  extraReducers: {
    [getProfile.fulfilled]: (state, { payload }) => {
      state.profiles = payload;
      state.loading = false;
      state.isProfile = true;
    },
    [getProfile.rejected]: (state, { payload }) => {
      state.error = payload;
      console.log(payload);
      state.loading = false;
      state.isProfile = false;
    },
  },
});
export const { Logout } = profileSlice.actions;
export default profileSlice.reducer;
