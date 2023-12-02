import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alertSlice";
import authReducer from "./reducers/authSlice";
import profileReducer from "./reducers/profileSlice";

const store = configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
