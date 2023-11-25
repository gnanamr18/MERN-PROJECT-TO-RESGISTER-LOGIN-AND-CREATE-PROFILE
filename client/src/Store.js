import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alertSlice";
import authReducer from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
  },
});

export default store;
