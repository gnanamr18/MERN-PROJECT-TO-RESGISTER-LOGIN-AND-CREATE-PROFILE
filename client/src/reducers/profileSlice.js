import { createSlice } from "@reduxjs/toolkit";
import { getProfile, registerProfile } from "../actions/profileService";

const initialState = {
  loading: true,
  profiles: [],
  error: {},
  isProfile: undefined,
  regProfile: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    Logout: (state) => {
      state.profiles = [];
      console.log("hi");
      state.isProfile = undefined;
    },
  },
  extraReducers: {
    [getProfile.fulfilled]: (state, payload) => {
      state.profiles = payload.payload;
      state.loading = false;
      state.isProfile = true;
      console.log(payload.payload);
    },
    [getProfile.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.isProfile = false;
    },

    [registerProfile.rejected]: (state, { payload }) => {
      state.regProfile = false;
      console.log(payload);
    },

    [registerProfile.fulfilled]: (state, { payload }) => {
      state.regProfile = true;
    },
  },
});
export const { Logout } = profileSlice.actions;
export default profileSlice.reducer;
