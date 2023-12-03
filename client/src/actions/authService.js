import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendURL}/api/auth`,
        { email, password },
        config
      );

      // store user's token in local storage
      localStorage.setItem("userToken", data.token);
      console.log(data.token);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.error_message) {
        console.log(error);
        return rejectWithValue(error.response.data.error_message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await axios.post(
        `${backendURL}/api/users`,
        { name, email, password },
        config
      );

      localStorage.setItem("userToken", data.token);
    } catch (error) {
      console.log(error.response.data.errors);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  }
);
