import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";
// const jwtToken = localStorage.getItem("userToken");

export const getProfile = createAsyncThunk(
  "profile/me",
  async (jwtToken, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "x-auth-token": jwtToken.jwtToken,
        },
      };
      console.log(jwtToken.jwtToken);
      const { data } = await axios.get(`${backendURL}/api/profile/me`, config);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.error_message) {
        console.log(error);
        return rejectWithValue(error.response.data.error_message);
      } else {
        return rejectWithValue(error);
        console.log(error);
      }
    }
  }
);
