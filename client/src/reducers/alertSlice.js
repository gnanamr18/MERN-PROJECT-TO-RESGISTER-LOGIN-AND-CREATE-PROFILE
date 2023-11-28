import { createSlice, nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = [];

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action) => {
      const alert = { id: nanoid(), text: action.payload };
      state.push(alert);
    },
    removeAlert: (state, action) => {
      return (state = state.filter((alert) => alert.id !== action.payload));
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
