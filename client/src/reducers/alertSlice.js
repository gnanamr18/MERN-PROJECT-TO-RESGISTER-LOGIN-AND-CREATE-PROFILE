import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  alerts: [{ id: "", text: "" }],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    alert: (state, action) => {
      const alert = { id: nanoid(), text: action.payload };
      state.alerts.push(alert);
    },
    removealert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
});

export const { alert, removealert } = alertSlice.actions;

export default alertSlice.reducer;
